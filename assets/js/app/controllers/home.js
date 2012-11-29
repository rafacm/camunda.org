'use strict';

angular.module('camundaorg.controllers', []);

function HomeController($scope) {
  $scope.$emit("navigation-changed");
}
