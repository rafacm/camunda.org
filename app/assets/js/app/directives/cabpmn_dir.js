'use strict'

angular.module('camundaorg.directives')

.directive('bpmnSrc', function() {
  return {
    link: function(scope, element, attrs) {

    	var bpmnResource = attrs.bpmnSrc;
		
		bpmn(bpmnResource, element);
		//$('body').scrollspy('refresh');
    }
  }
})
.directive('bpmnRun', function() {
  return {
    scope: true,
    transclude: true, 
    template: '<div><div ng-transclude></div><a class="btn" ng-click="startProcess()">kacken</a></div>',
    link: function(scope, element, attrs) {

      var bpmnResource = attrs.bpmnSrc;

      $.get("http://localhost:8000/app/assets/bpmn/" + bpmnResource + ".bpmn", function(data){
        
        scope.processDefinition = CAM.transform(data)[0];

        if(!scope.startProcess) {
          scope.startProcess = function() {
             var execution = new CAM.ActivityExecution(scope.processDefinition);
             execution.variables["kack"] = element.attr("id");
              execution.start();
          }
        }

    });
  }
}
})
.directive('bpmnTutorial', function() {
  return {
    link: function(scope, element, attrs) {
		
		$('.tutPop', element).popover({
			"trigger": "hover",
			"placement": "bottom"
		});

    }
  }
})
.directive('caAffix', function() {
  return {
    link: function(scope, element, attrs) {
		
		$(element).affix({"offset":250});
		//$('body').scrollspy({"target":"#navSide"});
    }
  }
}).directive('bpmnSymbol', function() {
  return {
    link: function(scope, element, attrs) {
		var bpmnSymbol = attrs.bpmnSymbol;
		var bpmnSymbolName = attrs.bpmnSymbolName;
		drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, element);
    }
  }
})