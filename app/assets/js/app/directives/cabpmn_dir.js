'use strict'

angular.module('camundaorg.directives')

.directive('bpmnSrc', function() {
  return {
    link: function(scope, element, attrs) {

    	var bpmnResource = attrs.bpmnSrc;
		
		bpmn(bpmnResource, $(element).attr("id"));
		//$('body').scrollspy('refresh');
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
})