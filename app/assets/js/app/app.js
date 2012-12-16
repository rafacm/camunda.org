'use strict';

angular
  .module('camundaorg', ['ng', 'camundaorg.filters', 'camundaorg.services', 'camundaorg.directives'])
	.config(['$routeProvider', function($routeProvider) {
 	  
 	  $routeProvider.when('/', {
        controller: HomeController,
        templateUrl: 'partials/homepage.html'
      })
      .otherwise({redirectTo: '/'});


	}])
	.config(['$locationProvider', function($locationProvider) {
		//$locationProvider.html5Mode(false).hashPrefix("!");
	}]);


    