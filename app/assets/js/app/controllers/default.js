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