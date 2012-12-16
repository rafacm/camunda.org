'use strict'

angular.module('camundaorg.directives')

.directive('tutorial', function($http, $templateCache) {
  return {
    link: function(scope, element, attrs) {

    	var template = attrs.tutorial;

    	var element = $(element);
    	element.addClass("row");
    	element.append("<div class=\"span3 tutorial-nav\"><ul id=\"tutorial-nav-list\" class=\"nav nav-list bs-docs-sidenav\"></ul></div>");    	  

    	$http.get(template, {cache: $templateCache}).success(function(response) {
    		var content = markdown.toHTML(response);
    		$(element).append("<div class=\"span9\">"+content+"</div>");
    		var headlines = $("h1", element);
    		var navList = $("#tutorial-nav-list", element);
    		angular.forEach(headlines, function(headline){
    			var text = $(headline).text();
    			var anchor = text.replace(/\s/g, '').replace(/\./g, '').replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;');
    			navList.append("<li><a href=\"#"+anchor+"\" target=\"_self\"><i class=\"icon-chevron-right\"></i>"+text+"</a></li>");
    
    		});

    		$("#tutorial-nav-list").affix({
		      offset: {
		        top: function () { return  $(window).width() <= 980 ? 290 : 210 }
		      , bottom: 290
		      }
		    });

    	}).error(function() {
    		$(contentContainer).append(template+" could not be loaded");
    	});


    }
  }
});