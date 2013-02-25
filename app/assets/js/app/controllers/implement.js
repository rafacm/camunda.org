'use strict';

angular.module('camundaorg.controllers', []);

function AnimateProjectSetupController($scope) {
	
	function translateElement( element, distance )
	{
	  var x, y;
	  for( var i = 0; i < 100; i++ )
	  {
	    setTimeout( function( ) {
	      x = distance.x * i / 100;
	      y = distance.y * i / 100;
	      element.transform.baseVal.getItem( 0 ).setTranslate( x, y );
	    }, 20 + i );
	  }
	}

	var element = document.getElementById( "bpmn-container" );

	translateElement(element, {x:0,y:10});
	

};
