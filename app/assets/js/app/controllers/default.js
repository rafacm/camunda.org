'use strict';

window.credentials = null;

function DefaultController($scope, $location) {
  
  // Bread Crumb 
  var breadCrumbs = $scope.breadCrumbs = [];

  $scope.initFade = function () {
    $(document).ready(function() {
      var controller = $.superscrollorama();

      controller.addTween('#desgin-implement-img', TweenMax.from( $('#desgin-implement-img'), 1.0, {css:{opacity: 0}}), 0, -300);
      controller.addTween('#desgin-implement-fork', TweenMax.from( $('#desgin-implement-fork'), 1.0, {css:{opacity: 0}}), 0, -300);
    });
  };

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
        var tokens = {};
   /** CAM.parseListeners.push(function(activityDefinition){
      if (activityDefinition.type != "process" && activityDefinition.type != "startEvent") {



        activityDefinition.properties.asyncCallback = function(activityExecution) {

          console.log ("Task: " + activityExecution.activityDefinition.name);

          var transitionId = activityExecution.incomingTransitionId;

             console.log("take-" + transitionId);
          if(!!transitionId) {

              
              var paper = caBpmnPapers[activityExecution.parentExecution.variables["paperId"]];

              var e = paper.getById(transitionId);

              tokens[e.id] = e;

              
                            paper.customAttributes.along = function (a, cid) {
                              
                              console.log ("element mit id: " + cid + " ist: " + tokens[cid]);
                              console.log ("a: " + a);
                              l = tokens[cid].getTotalLength();
                              to = 1;

                              
                                  var p = tokens[cid].getPointAtLength(a * l);  

                                  return {                                  
                                    transform: "t" + [p.x, p.y] 
                                  }

                              };
                                                          

                              // draw and animate token
                              var c = paper.ellipse(0, 0, 5, 5);
                              console.log ("c.id is " + c.id);
                              tokens[c.id] = e;

                              c.attr({"stroke":"none", "fill":"blue"}).attr({
                                along: [0,c.id]
                                });

                              c.animate({
                                  along: [to,c.id]
                                  //along: to, "huhu"
                                  //transform: "t" + [p.x, p.y - 10] + "r" + p.alpha
                                }, 1000, function() {
                                  //alert ("animation of " + c.id + " finished.");
                                  // remove token
                                  c.remove();
                                  var task = paper.getById(activityExecution.activityDefinition.id);
                                  task.attr({"fill":"lightBlue"});

                                  activityExecution.continue();
                                });


            } else {
              activityExecution.continue();
            }
          
        };
      }
    });  **/


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