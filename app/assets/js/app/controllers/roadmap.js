'use strict';

angular.module('camundaorg.controllers', ['ngResource', 'camundaorg.services']);

function RoadmapController($scope, $resource, CSV) {
  var getResource 	= $resource('./assets/csv/roadmap.csv');
	var roadmapResource = new getResource();
	roadmapResource.$get({sid: Math.random()}, //generate a random string to prevent proxy caching
		function(data) {
			var i = 0;
			var e = null;
			var string = "";
      $scope.roadmapErrorText = "";
      
			for(e in data) {
				i++;
			}
			for(var n = 0; n<= i; n++) {
				if(typeof data[n] === "undefined") {
					
				} else {
					string = string + data[n];
				}
			}
			$scope.roadmapRows = CSV.csv2json(string, { delim: ';', textdelim: '"'});
		},
		function() {
			$scope.roadmapErrorText = "The roadmap is currently unavailable!";
		}
	);
	
	$scope.isNotNull = function(value) {
		if(value == 0 || typeof value === undefined || value == "" || value == "" || value == null) {
			return false;
		} else {
			return true;
		}
	};
};