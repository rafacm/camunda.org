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

	$scope.animateProjectSetup = function() {

		var element1 = document.getElementById( "bpmn-container" );
		var element2 = document.getElementById( "java-container" );
		var element3 = document.getElementById( "taskForms-container" );

		element1.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
		element2.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
		element3.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );


		setTimeout( function() {
			translateElement(element1, {x:0,y:200}, 0);

			setTimeout( function() {
				translateElement(element2, {x:0,y:200}, 0);

					setTimeout( function() {
						translateElement(element3, {x:0,y:200}, 0);

		/*				setTimeout( function() {
							var element4 = document.getElementById( "maven-container" );
							translateElement(element4, {x:232,y:0}, 0);					
						}, 1000);
		*/

					}, 1000);

			}, 1000);
		}, 1000);

	};

	$scope.animateProjectSetup();

};

function RuntimeContainers($scope) {

	$scope.selectedContainer = "NOTHING";

	$scope.toggleContainer = function(container) {
		if(container == $scope.selectedContainer) {
			$scope.selectedContainer = "NOTHING";
		} else {
			$scope.selectedContainer = container;
		}
	}

	$scope.class = function(container) {
		return "container-" + (container == $scope.selectedContainer ? (container+"-glow") : container);
	}



};
