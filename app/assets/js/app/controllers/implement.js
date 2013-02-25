'use strict';

angular.module('camundaorg.controllers', []);

function AnimateProjectSetupController($scope) {

	function translateElement( element, distance, i)
	{
	 
	    setTimeout( function( ) {
	      var x = distance.x * i / 100;
	      var y = distance.y * i / 100;
	      element.transform.baseVal.getItem( 0 ).setTranslate( x, y );

	      i++;

	      if(y <= distance.y && x <= distance.x) {
	      	translateElement(element, distance, i);
	      }

	    }, i*0.18);
	  
	}

	var element1 = document.getElementById( "bpmn-container" );
	translateElement(element1, {x:0,y:200}, 0);

	setTimeout( function() {
		var element2 = document.getElementById( "java-container" );
		translateElement(element2, {x:0,y:200}, 0);

			setTimeout( function() {
				var element3 = document.getElementById( "taskForms-container" );
				translateElement(element3, {x:0,y:200}, 0);

/*				setTimeout( function() {
					var element4 = document.getElementById( "maven-container" );
					translateElement(element4, {x:232,y:0}, 0);					
				}, 1000);
*/

			}, 1000);

	}, 1000);

	
	

};
