var highlightActive = {
    stroke: "grey",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 1
  };

var eventStyle = {
    stroke: "grey",
    "stroke-width": 1.5,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 1,
	"fill": "white"
  };

  var gatewayMarkerStyle = {
    stroke: "grey",
    "stroke-width": 4,
  };

  var endEventStyle = {
    stroke: "grey",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 1,
	"fill": "white"
  };
  
  
  function bpmn (diagram) {

//$("#processDiagramWrapper").append(elementHTML(element));
 var paper = Raphael("processDiagramOverlay", 2000, 680);

parseBPMNXML(diagram, paper);


 
 

}

function elementHTML (element) {
	elementH = '<div ' + 
	' style=\"position: absolute; border: 1px solid red;' +
	'left: '+ element.x + 'px; ' + 
	'top: '+ element.y + 'px; '+
	'width: '+ element.width + 'px; '+
	'height: '+ element.height + 'px; '+
	'\">' + '</div>';
	return elementH;
}

function elementSVG (element, paper) {

	// Events
	if (element.type.toLowerCase().indexOf("event") >= 0) {
		var rad = element.width / 2;	
		var x = parseInt(parseInt(element.x) + rad);
		//alert ("element.y: " + element.y);
		var y = parseInt(parseInt(element.y) + rad);
		//alert ("y: " + y);
		paper.circle(x, y, rad)
			  .attr(eventStyle);
		if ((element.type.toLowerCase().indexOf("intermediate") >= 0) || (element.type.toLowerCase().indexOf("boundary") >= 0)) {
			// intermediate event border
			paper.circle(x, y, rad-2)
			  .attr(eventStyle);
		}
		if (element.type.toLowerCase().indexOf("end") >= 0) {
			// intermediate event border
			paper.circle(x, y, rad)
			  .attr(endEventStyle);
		}
			  
		if (element.eventType == "message") {
			envX = x - 8;
			envY = y - 5;
			envelope = "M" + envX + " " + envY + " l0 10  l16 0  l0 -10  z M" + envX + " " + envY + " l8 6  l8 -6";
			paper.path(envelope).attr(highlightActive);
		} else if (element.eventType == "timer") {
			envX = x - 1;
			envY = y - 10;
			paper.circle(x, y, rad-7)
			  .attr(highlightActive);

			// M15 5  L15 8  M20 6  L18.5 9  M24 10  L21 11.5  M25 15  L22 15  M24 20  L21 18.5  M20 24  L18.5 21  M15 25  L15 22  M10 24  L11.5 21  M6 20  L9 18.5  M5 15  L8 15  M6 10  L9 11.5  M10 6  L11.5 9  M17 8  L15 15  L19 15
			eventPath = "M" + envX + " " + envY + " l0 3  M" + parseInt(envX + 5) + " " + parseInt(envY + 1) + " l-1.5 3  M" + parseInt(envX + 9) + " " + parseInt(envY + 5) + " l-3 1.5  M" + parseInt(envX + 10) + " " + parseInt(envY + 10) + " l-3 0  M" + parseInt(envX + 9) + " " + parseInt(envY + 15) + " l-3 -1.5 M" + parseInt(envX + 5) + " " + parseInt(envY + 19) + " l-1.5 -3  M" + parseInt(envX + 0) + " " + parseInt(envY + 20) + " l0 -3  M" + parseInt(envX - 5) + " " + parseInt(envY + 19) + " l1.5 -3  M" + parseInt(envX - 9) + " " + parseInt(envY + 15) + " l3 -1.5  M" + parseInt(envX - 10) + " " + parseInt(envY + 10) + " l3 0  M" + parseInt(envX - 9) + " " + parseInt(envY + 5) + " l3 1.5 M" + parseInt(envX - 5) + " " + parseInt(envY + 1) + " l1.5 3 M" + parseInt(envX + 2) + " " + parseInt(envY + 3) + " l-2 7 l4 0";
			paper.path(eventPath).attr(highlightActive);
			
		}

			//paper.path("M15 5  L15 8  M20 6  L18.5 9  M24 10  L21 11.5  M25 15  L22 15  M24 20  L21 18.5  M20 24  L18.5 21  M15 25  L15 22  M10 24  L11.5 21  M6 20  L9 18.5  M5 15  L8 15  M6 10  L9 11.5  M10 6  L11.5 9  M17 8  L15 15  L19 15");
	// Gateways
	} else if (element.type.toLowerCase().indexOf("gateway") >= 0) {
		var x = element.x;
		var y = parseInt(element.y) + element.height/2;
		var radHeight = element.height/2;
		var radWidth = element.width/2;
		var rhombus = "M" + x + " " + y + " l" + radWidth + " -" + radHeight + " l" + radWidth + " " + radHeight + " l-" + radWidth + " " + radHeight + " l-" + radHeight + " -" + radWidth;
		paper.path(rhombus)
				.attr(highlightActive);
		paper.text(parseInt(x) + parseInt(element.width) - 5, parseInt(y) + parseInt(element.height/2) -8, element.name).attr({'text-anchor': 'start'});
		var markerX = parseInt(element.x) + parseInt(element.width/2.6);
		var markerY = parseInt(element.y) + parseInt(element.height/3);
		// M13.25 12.05  L17.25 12.05  L27.65 28.95  L23.75 28.95  z
		//  M13.25 28.95  L23.75 12.05  L27.65 12.05  L17.25 28.95 
		//var marker1 = "M" + markerX + " " + markerY + " l4 0  l10.5 16.9  l-3.9 0  z";
		var marker1 = "M" + markerX + " " + markerY + " l10.5 16.9 z";
		//var marker2 = "M" + markerX + " " + parseInt(parseInt(markerY) + 16.9) + " l10.5 -16.9 l3.9 0 l-10.5 16.9 z";
		var marker2 = "M" + markerX + " " + parseInt(parseInt(markerY) + 16.9) + " l10.5 -16.9 z";
		paper.path(marker1).attr(gatewayMarkerStyle);
		paper.path(marker2).attr(gatewayMarkerStyle);
	// Pools
	} else if (element.type.toLowerCase().indexOf("participant") >= 0) {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				0)
			  .attr(highlightActive);
		var textX = parseInt(parseInt(element.x) + 10);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		paper.text(textX, textY, element.name).rotate(-90,x,200);			  

	// Lanes
	} else if (element.type.toLowerCase().indexOf("lane") >= 0) {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				0)
			  .attr(highlightActive);
		var textX = parseInt(parseInt(element.x) + 10);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		paper.text(textX, textY, element.name).rotate(-90,x,200);			  
	
	// Activities
	} else {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				5)
			  .attr(highlightActive);
		var textX = parseInt(parseInt(element.x) + parseInt(element.width)/2);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		paper.text(textX, textY, element.name);			  
	}
	
}

function drawFlow (pathSpec, paper) {
    var pathString = "M"+(pathSpec[0].x)+","+(pathSpec[0].y);
    for (var i=1; i<pathSpec.length; i++) { 
      if(i==1) {
        pathString += "L";
      }
      pathString += (pathSpec[i].x)+","+(pathSpec[i].y);
      if((i+1) != pathSpec.length) {
        pathString += " ";
      }
    }
	
    // draw sequenceflow highlight
    var e = paper.path(pathString).attr(highlightActive).attr("arrow-end", "block-midium-midium"),
        l = e.getTotalLength(),
       to = 1;

}


function parseBPMNXML (diagram, paper) {

$.get("http://localhost:8000/app/assets/bpmn/" + diagram + ".bpmn", function(data){
	
	$(data).find("bpmndi\\:BPMNShape").each(function(){
	
		var $elem = $(this);
		var element = new Object;
		element.id = $elem.attr("bpmnElement");
		element.x = $(this).find('omgdc\\:Bounds').attr("x");
		element.y = $(this).find('omgdc\\:Bounds').attr("y");
		element.width = $(this).find('omgdc\\:Bounds').attr("width");
		element.height = $(this).find('omgdc\\:Bounds').attr("height");
		
		$(data).find('[id="' + element.id + '"]').each(function() {
			semanticE = (this);
			//alert (semanticE.nodeName);
			element.type = (this).nodeName;
			element.name = $(this).attr("name");
			if (element.type.toLowerCase().indexOf("event") >= 0) {
				element.eventType = "none";
				$(semanticE).find('timerEventDefinition').each(function() {
					element.eventType = "timer";
				});
				$(semanticE).find('messageEventDefinition').each(function() {
					element.eventType = "message";
				});
			}
				//alert (semanticE.attr("name"));
		});
		
	
		elementSVG (element, paper);
		//$("#processDiagramWrapper").append(elementHTML(element));
	});

	$(data).find("bpmndi\\:BPMNEdge").each(function(){
		var $edge = $(this);
		var pathSpec = new Array();

		$edge.find("omgdi\\:waypoint").each(function(){
			var waypoint = $(this);
			//alert(waypoint.attr("x"));	
			pathSpecElem = new Object();
			pathSpecElem.x = waypoint.attr("x");
			pathSpecElem.y = waypoint.attr("y");
			pathSpec.push(pathSpecElem);
		});
		
		drawFlow(pathSpec, paper);

	});
	
});


}




