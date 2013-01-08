'use strict';

window.credentials = null;

function DefaultController($scope, $location) {
  
  // Bread Crumb 
  var breadCrumbs = $scope.breadCrumbs = [];

  $scope.$on("navigation-changed", function(event, navigationItem) {
    if (!navigationItem) {
      breadCrumbs.splice(0, breadCrumbs.length);
    } else {
      var contains = false;
      var remove = 0;
      angular.forEach(breadCrumbs, function(item) {
        if (item.name == navigationItem.name) {
          contains = true;
        }
        if (item.href.indexOf($location.path())) {
          remove++;
        }
      });

      for (var i = 0; i < remove; i++) {
        breadCrumbs.pop();
      }

      if (!contains) {
        breadCrumbs.push({name:navigationItem.name, href: $location.path()});
      }
    }
  });
  // end Bread Crumb

      CAM.parseListeners.push (function(activityDefinition){
        activityDefinition.listeners.push ({
          "start":function(activityExecution){
              console.log("start-"+activityExecution.activityDefinition.name);
            },
          "take" : function(activityExecution,transition) {
              console.log("take-"+transition.id);
              
              var paper = caBpmnPapers[activityExecution.parentExecution.variables["kack"]];

              var e = paper.getById(transition.id);
              
                            paper.customAttributes.along = function (a) {
                                var p = e.getPointAtLength(a * l);
                                return {
                                  transform: "t" + [p.x, p.y - 10] + "r" + p.alpha
                                  };
                              };

                              // draw and animate token
                              var c = paper.ellipse(0, 0, 5, 5).attr({
                                along: 0
                                }).animate({
                                  along: to
                                }, 1000, function() {
                                  // remove token
                                  c.remove();
                                });

          }
        })
      });

    CAM.parseListeners.push(function(activityDefinition){
      if (activityDefinition.typeId != "process" && activityDefinition.typeId != "startEvent") {

        activityDefinition.properties.asyncCallback = function(activityExecution) {
          //interruptedExecution = activityExecution;
          console.log ("Asynch Callback: " + activityExecution.activityDefinition.id);

          setTimeout(function(){
            activityExecution.continue();

          }, 1000)
          
        };
      }
    });  


  $scope.scrollTo = function(elementId) {
    window.scroll(0, $("#"+elementId).position().top);  
  }

}

/**
 * Deals with navigation between different guys
 */
function NavigationController($scope, $location) {

  $scope.activeClass = function(link) {
    var path = $location.absUrl();      
    return path.indexOf(link) != -1 ? "active" : "";
  };
}