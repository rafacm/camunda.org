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
        $routeProvider.when('/tasks/user-task', {
            templateUrl: 'partials/implement/tasks/user-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/script-task', {
            templateUrl: 'partials/implement/tasks/script-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/business-rule-task', {
            templateUrl: 'partials/implement/tasks/business-rule-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/manual-task', {
            templateUrl: 'partials/implement/tasks/manual-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/receive-task', {
            templateUrl: 'partials/implement/tasks/receive-task.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/tasks/markers', {
            templateUrl: 'partials/implement/tasks/task-markers.html',
            controller: 'DefaultController'
        });



        $routeProvider.when('/subprocess/embedded-subprocess', {
            templateUrl: 'partials/implement/subprocess/embedded-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/call-activity', {
            templateUrl: 'partials/implement/subprocess/call-activity.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/event-subprocess', {
            templateUrl: 'partials/implement/subprocess/event-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocess/transaction-subprocess', {
            templateUrl: 'partials/implement/subprocess/transaction-subprocess.html',
            controller: 'DefaultController'
        });
        

        $routeProvider.when('/concepts/listeners', {
            templateUrl: 'partials/implement/concepts/listeners.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/concepts/error-handling', {
            templateUrl: 'partials/implement/concepts/error-handling.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/concepts/cdi', {
            templateUrl: 'partials/implement/concepts/cdi.html',
            controller: 'DefaultController'
        });

    });


    