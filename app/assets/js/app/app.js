'use strict';

angular
  .module('camundaorg', ['ng', 'ngResource', 'camundaorg.filters', 'camundaorg.services', 'camundaorg.directives'])

  .config(function ($routeProvider) {

        $routeProvider.when('/design/reference', {
            templateUrl: 'partials/design/reference.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/activities/tasks', {
            templateUrl: 'partials/design/activities/tasks.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/gateways/xor', {
            templateUrl: 'partials/design/gateways/xor.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/and', {
            templateUrl: 'partials/design/gateways/and.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/or', {
            templateUrl: 'partials/design/gateways/or.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/design/gateways/event', {
            templateUrl: 'partials/design/gateways/event.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/participants/lanes', {
            templateUrl: 'partials/design/participants/lanes.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/design/events/basics', {
            templateUrl: 'partials/design/events/basics.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/message', {
            templateUrl: 'partials/design/events/message.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/timer', {
            templateUrl: 'partials/design/events/timer.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/error', {
            templateUrl: 'partials/design/events/error.html',
            controller: 'DefaultController'
        });  
        $routeProvider.when('/design/events/conditional', {
            templateUrl: 'partials/design/events/conditional.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/signal', {
            templateUrl: 'partials/design/events/signal.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/termination', {
            templateUrl: 'partials/design/events/termination.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/link', {
            templateUrl: 'partials/design/events/link.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/compensation', {
            templateUrl: 'partials/design/events/compensation.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/multiple', {
            templateUrl: 'partials/design/events/multiple.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/parallel', {
            templateUrl: 'partials/design/events/parallel.html',
            controller: 'DefaultController'
        });        
        $routeProvider.when('/design/events/escalation', {
            templateUrl: 'partials/design/events/escalation.html',
            controller: 'DefaultController'
        });    
        $routeProvider.when('/design/events/cancel', {
            templateUrl: 'partials/design/events/cancel.html',
            controller: 'DefaultController'
        });   

        $routeProvider.when('/design/activities/subprocess', {
            templateUrl: 'partials/design/activities/subprocess.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/callactivity', {
            templateUrl: 'partials/design/activities/callactivity.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/adhoc', {
            templateUrl: 'partials/design/activities/adhoc.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/activities/event', {
            templateUrl: 'partials/design/activities/event.html',
            controller: 'DefaultController'
        }); 
        $routeProvider.when('/design/participants/pool', {
            templateUrl: 'partials/design/participants/pool.html',
            controller: 'DefaultController'
        });         



        $routeProvider.when('/events/event-overview', {
            templateUrl: 'partials/implement/events/event-overview.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/none-events', {
            templateUrl: 'partials/implement/events/none-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/timer-events', {
            templateUrl: 'partials/implement/events/timer-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/message-events', {
            templateUrl: 'partials/implement/events/message-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/error-events', {
            templateUrl: 'partials/implement/events/error-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/signal-events', {
            templateUrl: 'partials/implement/events/signal-events.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/events/cancel-and-compensation-events', {
            templateUrl: 'partials/implement/events/cancel-and-compensation-events.html',
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



        $routeProvider.when('/subprocesses/embedded-subprocess', {
            templateUrl: 'partials/implement/subprocesses/embedded-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocesses/call-activity', {
            templateUrl: 'partials/implement/subprocesses/call-activity.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocesses/event-subprocess', {
            templateUrl: 'partials/implement/subprocesses/event-subprocess.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/subprocesses/transaction-subprocess', {
            templateUrl: 'partials/implement/subprocesses/transaction-subprocess.html',
            controller: 'DefaultController'
        });
        
        $routeProvider.when('/gateways/exclusive-gateway', {
            templateUrl: 'partials/implement/gateways/exclusive-gateway.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/gateways/parallel-gateway', {
            templateUrl: 'partials/implement/gateways/parallel-gateway.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/gateways/inclusive-gateway', {
            templateUrl: 'partials/implement/gateways/inclusive-gateway.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/gateways/event-based-gateway', {
            templateUrl: 'partials/implement/gateways/event-based-gateway.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/gateways/sequence-flow', {
            templateUrl: 'partials/implement/gateways/sequence-flow.html',
            controller: 'DefaultController'
        });

        $routeProvider.when('/concepts/listeners', {
            templateUrl: 'partials/implement/concepts/listeners.html',
            controller: 'DefaultController'
        });
        $routeProvider.when('/concepts/custom-extensions', {
            templateUrl: 'partials/implement/concepts/custom-extensions.html',
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
	
	$routeProvider.when('/rest/overview', {
            templateUrl: 'partials/implement/rest/overview.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get', {
            templateUrl: 'partials/implement/rest/process-definition/get.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-query', {
            templateUrl: 'partials/implement/rest/process-definition/get-query.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-query-count', {
            templateUrl: 'partials/implement/rest/process-definition/get-query-count.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-xml', {
            templateUrl: 'partials/implement/rest/process-definition/get-xml.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/post-start-process', {
            templateUrl: 'partials/implement/rest/process-definition/post-start-process.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-statistics', {
            templateUrl: 'partials/implement/rest/process-definition/get-statistics.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-activity-statistics', {
            templateUrl: 'partials/implement/rest/process-definition/get-activity-statistics.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-definition/get-start-form', {
            templateUrl: 'partials/implement/rest/process-definition/get-start-form.html',
            controller: 'DefaultController'
        });
	
	$routeProvider.when('/rest/process-instance/get-query', {
            templateUrl: 'partials/implement/rest/process-instance/get-query.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-instance/get-query-count', {
            templateUrl: 'partials/implement/rest/process-instance/get-query-count.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-instance/post-query', {
            templateUrl: 'partials/implement/rest/process-instance/post-query.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-instance/post-query-count', {
            templateUrl: 'partials/implement/rest/process-instance/post-query-count.html',
            controller: 'DefaultController'
        });
	$routeProvider.when('/rest/process-instance/get-variables', {
            templateUrl: 'partials/implement/rest/process-instance/get-variables.html',
            controller: 'DefaultController'
        });
    });


    