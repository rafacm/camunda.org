'use strict'

angular.module('camundaorg.directives')

.directive('docLocationHighlight', function($location) {
  return {
    link: function(scope, element, attrs) {

    	var href = $(element).attr("href");

    	if(href.indexOf($location.path())>0) {
    		$(element).css("background-color", "blue");
    	}

    }
  }
});