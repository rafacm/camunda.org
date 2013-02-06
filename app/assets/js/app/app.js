'use strict';

angular
  .module('camundaorg', ['ng', 'camundaorg.filters', 'camundaorg.services', 'camundaorg.directives'])

  .config(function ($routeProvider) {
        $routeProvider.when('/events/start-events', {
            templateUrl: 'partials/implement/events/start-events.html',
            controller: 'DefaultController'
        });
    });


    