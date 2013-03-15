'use strict';

angular.module('camundaorg.controllers');

function NumberguessAppController($scope, $http, $element) {

  // list of currently suspended activities (activites waiting in an async continuation 
  // ie. waiting for a trigger. Could be more than one even though we do not have concurrency 
  // in this simple example.)
  $scope.suspendedActivities = [];

  // a list of activites that are currently active
  $scope.activeActivities = [];

  $scope.guess = undefined;

  $scope.isProcessDefinitionConfigured = false;

  $scope.guessCounter = 0;

  $scope.startProcess = function(processId) {
    var processDefinitions = $scope.bpmn.processDefinitions;
    
    // find the process definition with the given Id
    var processDefinition;
    for (var i = 0; i < processDefinitions.length; i++) {
      if(processDefinitions[i].id == processId) {
        processDefinition = processDefinitions[i];
        break;
      }
    };
    if(!processDefinition) {
      throw "could not find process definition with id " + processId +" in current scope.";
    }
    
    if(!$scope.isProcessDefinitionConfigured) {
      // configure the process definition
      for (var i = 0; i < processDefinition.baseElements.length; i++) {
        var activity = processDefinition.baseElements[i];


        // attach execution listener to all activities in the process definition
        var listeners = activity.listeners;
        if(!!activity.listeners) {
          listeners.push({
            "start" : function(activityExecution) {
              var actId = activityExecution.activityDefinition.id;
              $scope.$emit("activityStart", actId);
            },
            "end" : function(activityExecution) {
              var actId = activityExecution.activityDefinition.id;
              $scope.$emit("activityEnd", actId);      
            }
          });
        }
        
        // make activities async
        if(activity.type != "userTask" && activity.type != "process") {
          activity.asyncCallback = function(activityExecution) {
            if(activityExecution.activityDefinition.id == "exclusiveGW" && $scope.guessCounter > 1) {
             activityExecution.doContinue();
            } else {
             $scope.suspendedActivities.push(activityExecution);
            }            
          }
        }      
      }
      $scope.isProcessDefinitionConfigured = true;
    }

    // create a new ActivityExecution for the process definition & start it
    $scope.processInstance = new CAM.ActivityExecution(processDefinition);
    $scope.processInstance.variables.secret = Math.floor((Math.random()*5)+1);
    $scope.processInstance.start();
  };

  $scope.isGuessWrong = function() {
    return !$scope.guess && $scope.guessCounter > 0;
  }

  $scope.isGuessValid = function() {
    return !!$scope.guess && $scope.guess >= 0 && $scope.guess <= 5;
  }

  $scope.isFirstGuess = function() {
    return $scope.guessCounter == 0;
  }

  $scope.cancel = function() {
    $scope.processInstance = undefined;
    $scope.suspendedActivities = [];
    $scope.activeActivities = [];
    $scope.guessCounter = 0;
  }

  $scope.doContinue = function(activityId) {
    for (var i = 0; i < $scope.suspendedActivities.length; i++) {
      if($scope.suspendedActivities[i].activityDefinition.id == activityId) {
        $scope.suspendedActivities[i].doContinue();
        $scope.suspendedActivities.splice(i,1);
      }
    };
  };

  $scope.signal = function(activityId) {

    if(!$scope.isGuessValid()) {
      return;
    }

    for (var i = 0; i < $scope.processInstance.activityExecutions.length; i++) {
      var execution = $scope.processInstance.activityExecutions[i];
      if(execution.activityDefinition.id == activityId && !execution.isEnded) {
        $scope.processInstance.variables.guess = $scope.guess;
        $scope.guess = undefined;
        $scope.guessCounter++;
        execution.signal();
        break;
      }
    };
    
  };

  $scope.inactive = function() {
    return $scope.activeActivities.length == 0;
  };

  $scope.active = function(activityId) {
    return $scope.activeActivities.indexOf(activityId) > -1;
  }

  /* here we get notified when an activity is started */
  $scope.$on("activityStart", function(event, activityId) {
    $scope.activeActivities.push(activityId);   
  });

  /* here we get notified when an activity is ended */
  $scope.$on("activityEnd", function(event, activityId) {
    $scope.activeActivities.splice($scope.activeActivities.indexOf(activityId), 1);
  });

};