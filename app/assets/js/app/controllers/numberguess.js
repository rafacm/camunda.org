'use strict';

angular.module('camundaorg.controllers');

function NumberguessAppController($scope, $http, $element) {

  $scope.state = "inactive";
  $scope.activeNodes = [];

  $scope.paper = Raphael("animations", 900, 220);

  $scope.highlights = [];

  $scope.processVariables = {};

  $scope.highlightActive = {
    stroke: "Darkorange",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.7
  };

  $scope.highlightDone = {
    stroke: "green",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"         
  };

  $scope.highlightToken = {
    stroke: "Darkorange",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.7,
    fill: "Darkorange",
    "fill-opacity": 0.7          
  };

  $scope.processmodel = {
    "numberGuessing" : {
      "type" : "process",
      "flowNodes" : {
        "StartEvent_1" : {
                          "id" : "StartEvent_1",
                          "type" : "startEvent",
                          "outgoing" : ["SequenceFlow_1"],
                          "incoming" : []
        },
        "ServiceTask_1" : {
                          "id" : "ServiceTask_1",
                          "type" : "serviceTask",
                          "outgoing" : ["SequenceFlow_2"],
                          "incoming" : ["SequenceFlow_1"],
                          "behavior" : function() {
                            $scope.processVariables.random = Math.floor(Math.random()*101);
                          }
        },       
        "ExclusiveGateway_1" : {
                          "id" : "ExclusiveGateway_1",
                          "type" : "exclusiveGateway",
                          "outgoing" : ["SequenceFlow_3"],
                          "incoming" : ["SequenceFlow_2", "SequenceFlow_7"],
                          "continue" : function() {
                            return !$scope.processVariables.loopCount 
                             ? "aync"
                             : "sync";
                          }
        },
        "UserTask_1" : {
                          "id" : "UserTask_1",
                          "type" : "userTask",
                          "outgoing" : ["SequenceFlow_4"],
                          "incoming" : ["SequenceFlow_3"]
        },
        "ExclusiveGateway_2" : {
                          "id" : "ExclusiveGateway_2",
                          "type" : "exclusiveGateway",
                          "outgoing" : ["SequenceFlow_5", "SequenceFlow_7"],
                          "incoming" : ["SequenceFlow_4"],
                          "continue" : function() {
                            return !$scope.processVariables.loopCount 
                             ? "async"
                             : "sync";
                           }
        },
        "ServiceTask_2" : {
                          "id" : "ServiceTask_2",
                          "type" : "serviceTask",
                          "outgoing" : ["SequenceFlow_6"],
                          "incoming" : ["SequenceFlow_5"]
        },
        "EndEvent_1" : {
                          "id" : "EndEvent_1",
                          "type" : "endEvent",
                          "outgoing" : [],
                          "incoming" : ["SequenceFlow_6"]
        },
        "SequenceFlow_1" : {
                          "id" : "SequenceFlow_1",
                          "type" : "SequenceFlow",
                          "sourceRef" : "StartEvent_1",
                          "targetRef" : "ServiceTask_1"
        },
        "SequenceFlow_2" : {
                          "id" : "SequenceFlow_2",
                          "type" : "SequenceFlow",
                          "sourceRef" : "ServiceTask_1",
                          "targetRef" : "ExclusiveGateway_1"
        },        
        "SequenceFlow_3" : {
                          "id" : "SequenceFlow_3",
                          "type" : "SequenceFlow",
                          "sourceRef" : "ExclusiveGateway_1",
                          "targetRef" : "UserTask_1"
        },       
        "SequenceFlow_4" : {
                          "id" : "SequenceFlow_4",
                          "type" : "SequenceFlow",
                          "sourceRef" : "UserTask_1",
                          "targetRef" : "ExclusiveGateway_2"
        },        
        "SequenceFlow_5" : {
                          "id" : "SequenceFlow_5",
                          "type" : "SequenceFlow",
                          "sourceRef" : "ExclusiveGateway_2",
                          "targetRef" : "ServiceTask_2",
                          "condition" : function() {
                            return $scope.processVariables.guess == $scope.processVariables.random;
                          }
        },
        "SequenceFlow_6" : {
                          "id" : "SequenceFlow_6",
                          "type" : "SequenceFlow",
                          "sourceRef" : "ServiceTask_2",
                          "targetRef" : "EndEvent_1"
        },
        "SequenceFlow_7" : {
                          "id" : "SequenceFlow_7",
                          "type" : "SequenceFlow",
                          "sourceRef" : "ExclusiveGateway_2",
                          "targetRef" : "ExclusiveGateway_1",
                          "condition" : function() {
                            return $scope.processVariables.guess != $scope.processVariables.random;
                          },
                          "behavior" : function() {
                            return !$scope.processVariables.loopCount 
                              ? $scope.processVariables.loopCount = 1 
                              : $scope.processVariables.loopCount++; 
                          }
        },
      }
    }
  };
         
  $scope.diagram = {
    "StartEvent_1" : {
                            "x" : 150.0,
                            "y" : 171.0,
                            "width" : 36.0,
                            "height" : 36.0,
                      },
    "ServiceTask_1" : {
                            "x" : 240.0,
                            "y" : 145,
                            "width" : 110.0,
                            "height" : 89.0,
                      },
    "ServiceTask_2" : {
                            "x" : 770.0,
                            "y" : 145.0,
                            "width" : 110.0,
                            "height" : 89.0,
                      },
    "ExclusiveGateway_1": 
                      {  
                            "height":  50.0, 
                            "width" :  50.0,
                            "x"     : 400.0,
                            "y"     : 164.0,
                      },
    "UserTask_1": 
                      {  
                            "width" : 110.0,
                            "height" : 89.0,
                            "x"     : 500.0, 
                            "y"     : 145.0,
                      },
    "ExclusiveGateway_2": 
                      {  
                            "height":  50.0, 
                            "width" :  50.0,
                            "x"     : 670.0, 
                            "y"     : 164.0,
                      },
    "EndEvent_1": 
                      {  
                            "height":  36.0, 
                            "width" :  36.0,
                            "x"     : 930.0,
                            "y"     : 171.0,
                      },
    "SequenceFlow_1" :  [ 
                            { "x" : 186.0, "y" : 189 }, 
                            { "x" : 240, "y" : 189 }, 
                        ],
    "SequenceFlow_2" :  [ 
                            { "x" : 350.0, "y" : 189 }, 
                            { "x" : 400, "y" : 189 }, 
                        ],
    "SequenceFlow_3" :  [ 
                            { "x" : 451.0, "y" : 189 }, 
                            { "x" : 500, "y" : 189 }, 
                        ],
    "SequenceFlow_4" :  [ 
                            { "x" : 610.0, "y" : 189 }, 
                            { "x" : 670, "y" : 189 }, 
                        ],
    "SequenceFlow_5" :  [ 
                            { "x" : 721.0, "y" : 189 }, 
                            { "x" : 770, "y" : 189 }, 
                        ],
    "SequenceFlow_6" :  [ 
                            { "x" : 880.0, "y" : 189 }, 
                            { "x" : 930, "y" : 189 }, 
                        ],
    "SequenceFlow_7" :  [ 
                            { "x" : 695.0, "y" : 215 }, 
                            { "x" : 694.0, "y" : 298 }, 
                            { "x" : 425.0, "y" : 298 }, 
                            { "x" : 425.0, "y" : 215 }, 
                        ]
    };

  $scope.offsetX = -73;
  $scope.offsetY = -95;

  $scope.hasProcessVariable = function(variableName) {
    return !! $scope.processVariables[variableName];
  }

  $scope.isActive = function(activityId) {
    for(var i =0; i<$scope.activeNodes.length; i++) {
      if($scope.activeNodes[i].id == activityId) {
        return true;
      }
    }
    return false;
  }

  $scope.inactive = function() {
    return $scope.activeNodes.length == 0;
  };

  $scope.cancel = function() {
    $scope.activeNodes = [];
    $scope.processVariables = {};
    $('.startButton').css("display", "block");
    // hide all popus:
    var processModel = $scope.processmodel[$scope.activeProcess];
    for(var flowNode in processModel.flowNodes){
      $('#'+flowNode).css("display", "none");
    }
    // remove animations
    $scope.paper.clear();
  };

  $scope.showGenerateRandomNumber = function() {
    $scope.state = "showGenerateRandomNumber";
    var layout = $scope.layout["ServiceTask_1"];
    $scope.paper.rect(layout.x, layout.y, layout.width, layout.height, 5).attr($scope.highlightActive);
    
  };

  $scope.activateProcess = function(processName) {
    $('.startButton').css("display", "none");
    var processModel = $scope.processmodel[processName];
    $scope.activeProcess = processName;
    // find start events
    var startEvents = $scope.findNodesByType(processModel, "startEvent");
    for(var i = 0; i<startEvents.length; i++) {
      $scope.activateNode(startEvents[i].id);  
    }
    
  }

  $scope.activateNode = function(nodeId) {
    $scope.activeNodes.push(nodeId);

    var node = $scope.processmodel[$scope.activeProcess].flowNodes[nodeId];

    if(!!node.continue 
      && (node.continue == "sync" 
          || (typeof(node.continue) == "function" && node.continue() == "sync"))) {
      $scope.signalNode(nodeId);
    } else {

      // draw highlights:
      var layout = $scope.diagram[nodeId];
      var rad = layout.width / 2;

      if(node.type == "startEvent") {

        $scope.highlights.push(
          $scope.paper.circle(
            (layout.x + rad + $scope.offsetX), 
            (layout.y + rad + $scope.offsetY), 
            rad)
          .attr($scope.highlightActive));

      } else if(node.type == "serviceTask" || node.type == "userTask") {
        $scope.highlights.push(
          $scope.paper.rect(
            layout.x + $scope.offsetX, 
            layout.y + $scope.offsetY, 
            layout.width, 
            layout.height, 
            5)
          .attr($scope.highlightActive));

          if(!!node.behavior) {
            node.behavior();
          }

      } else if(node.type == "exclusiveGateway") {
        $scope.highlights.push(
          $scope.paper.rect(
            layout.x + $scope.offsetX, 
            layout.y + $scope.offsetY, 
            layout.width, 
            layout.height, 
            5)
          .attr($scope.highlightActive));
      }    
      
      $('#'+nodeId).css("display", "block");       
    }       
  }

  $scope.inActivateNode = function(nodeId) {
    
    $scope.activeNodes.splice($scope.activeNodes.indexOf(nodeId),1);

    // remove highlights
    for(var i=0; i<$scope.highlights.length; i++) {
      var highlight = $scope.highlights[i];
      highlight.attr($scope.highlightDone);
    }
    
    $('#'+nodeId).css("display", "none");
  }

  $scope.signalNode = function(nodeId) {    
    if($scope.activeNodes.indexOf(nodeId) != -1) {
      var node = $scope.processmodel[$scope.activeProcess].flowNodes[nodeId];
      $scope.inActivateNode(node.id);

      if(node.type == "endEvent") {
        $scope.cancel(); // done
      } else {      
        var outgoingSequenceFlows = node.outgoing;
        for (var i=0; i<outgoingSequenceFlows.length; i++) {
          var currentSequenceFlowId = outgoingSequenceFlows[i];
          if(node.type == "exclusiveGateway") {
            // evaluate conditions
            var currentSequenceFlow = $scope.processmodel[$scope.activeProcess].flowNodes[currentSequenceFlowId];        
            if(!!currentSequenceFlow.condition) {
              if(currentSequenceFlow.condition()) {
                $scope.take(currentSequenceFlowId)
              }
            } else {
              $scope.take(currentSequenceFlowId)
            }
          } else {
            $scope.take(currentSequenceFlowId)        
          }
          
        }
      }
    } else {
      // TODO : handle error; inactive node signaled

    }
  }

  $scope.findNodesByType = function(processModel, nodeType) {
    var nodesFound = [];
    for(var flowNode in processModel.flowNodes){
      var cNode = processModel.flowNodes[flowNode];
      if(cNode.type == nodeType) {
        nodesFound.push(cNode);
      }
    }
    return nodesFound;
  }

  $scope.take = function(sequenceflowId) {

    var sequenceflow = $scope.processmodel[$scope.activeProcess].flowNodes[sequenceflowId];
    if(!!sequenceflow.behavior) {
      sequenceflow.behavior();
    }

    var pathSpec = $scope.diagram[sequenceflowId];
    var pathString = "M"+(pathSpec[0].x + $scope.offsetX)+","+(pathSpec[0].y + + $scope.offsetY);

    for (var i=1; i<pathSpec.length; i++) { 
      if(i==1) {
        pathString += "L";
      }
      pathString += (pathSpec[i].x + $scope.offsetX)+","+(pathSpec[i].y + $scope.offsetY);
      if((i+1) != pathSpec.length) {
        pathString += " ";
      }
    }
    
    // draw sequenceflow highlight
    var e = $scope.paper.path(pathString).attr($scope.highlightActive).attr("arrow-end", "classic-midium-long"),
        l = e.getTotalLength(),
       to = 1;
    
    $scope.paper.customAttributes.along = function (a) {
      var p = e.getPointAtLength(a * l);
      return {
        transform: "t" + [p.x, p.y - 10] + "r" + p.alpha
        };
    };

    // draw and animate token
    var c = $scope.paper.ellipse(0, 0, 5, 5).attr({
      along: 0
    }).attr($scope.highlightToken).animate({
      along: to
    }, 500, function() {
      // remove token
      e.attr($scope.highlightDone);
      c.remove();
      // activate the next node in the diagram
      $scope.activateNode(sequenceflow.targetRef);
    });
      
  }
  
}