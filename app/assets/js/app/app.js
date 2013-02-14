'use strict';

angular
  .module('camundaorg', ['ng', 'camundaorg.filters', 'camundaorg.services', 'camundaorg.directives'])

  .config(function ($routeProvider) {
        $routeProvider.when('/events/start-events', {
            templateUrl: 'partials/implement/events/start-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/service-task', {
            templateUrl: 'partials/implement/tasks/service-task.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/concepts/error-handling', {
            templateUrl: 'partials/implement/concepts/error-handling.html',
            controller: 'DefaultController'
        });

    });


    