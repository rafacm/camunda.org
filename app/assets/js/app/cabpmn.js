var generalStyle = {
    stroke: "grey",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 1
}

var eventStyle = {
    "stroke-width": 1.5,
	"fill": "white"
};

var endEventStyle = {
    "stroke-width": 3,
};

  var activityStyle = {
    stroke: "grey",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 1,
	"fill": "white"
  };

  
  var gatewayMarkerStyle = {
    stroke: "grey",
    "stroke-width": 4,
  };

  
  var sequenceFlowStyle = {
   "stroke-width": 2,
	"arrow-end": "block-midium-midium",
	"stroke-linecap": "square",
	"stroke-linejoin": "round"  
  };
  
  var textStyle = {
	"font-size": 12, 
	"font-family": "Arial, Helvetica, sans-serif" 
  }
  
  function bpmn (diagram, container) {

	var paper = Raphael(container, "100%");
	//$("#processDiagramOverlay").css("height","180px");
	parseBPMNXML(diagram, paper);

}

function textLineBreaker (t, content, maxWidth) {
	var words = content.split(" ");

	var tempText = "";
	for (var i=0; i<words.length; i++) {
	  t.attr("text", tempText + " " + words[i]);
	  if (t.getBBox().width > maxWidth) {
		tempText += "\n" + words[i];
	  } else {
		tempText += " " + words[i];
	  }
	}

	t.attr("text", tempText.substring(1));
}

function elementSVG (element, paper) {

	// Event?
	if (element.type.toLowerCase().indexOf("event") >= 0) {
		var rad = element.width / 2;	
		var x = parseInt(parseInt(element.x) + rad);
		var y = parseInt(parseInt(element.y) + rad);
		
		// event border
		paper.circle(x, y, rad)
			  .attr(generalStyle).attr(eventStyle);
		
		// intermediate?
		if ((element.type.toLowerCase().indexOf("intermediate") >= 0) || (element.type.toLowerCase().indexOf("boundary") >= 0)) {
			// intermediate event border
			paper.circle(x, y, rad-2)
			  .attr(generalStyle).attr(eventStyle);
		
		// end?
		} else if (element.type.toLowerCase().indexOf("end") >= 0) {
			// end event border
			paper.circle(x, y, rad)
			  .attr(generalStyle).attr(eventStyle).attr(endEventStyle);
		}
		
		// message?
		if (element.eventType == "message") {
			envX = x - 8;
			envY = y - 5;
			envelope = "M" + envX + " " + envY + " l0 10  l16 0  l0 -10  z M" + envX + " " + envY + " l8 6  l8 -6";
			paper.path(envelope).attr(generalStyle);
		
		// timer?
		} else if (element.eventType == "timer") {
			envX = x - 1;
			envY = y - 10;
			paper.circle(x, y, rad-7).attr(generalStyle);

			// M15 5  L15 8  M20 6  L18.5 9  M24 10  L21 11.5  M25 15  L22 15  M24 20  L21 18.5  M20 24  L18.5 21  M15 25  L15 22  M10 24  L11.5 21  M6 20  L9 18.5  M5 15  L8 15  M6 10  L9 11.5  M10 6  L11.5 9  M17 8  L15 15  L19 15
			eventPath = "M" + envX + " " + envY + " l0 3  M" + parseInt(envX + 5) + " " + parseInt(envY + 1) + " l-1.5 3  M" + parseInt(envX + 9) + " " + parseInt(envY + 5) + " l-3 1.5  M" + parseInt(envX + 10) + " " + parseInt(envY + 10) + " l-3 0  M" + parseInt(envX + 9) + " " + parseInt(envY + 15) + " l-3 -1.5 M" + parseInt(envX + 5) + " " + parseInt(envY + 19) + " l-1.5 -3  M" + parseInt(envX + 0) + " " + parseInt(envY + 20) + " l0 -3  M" + parseInt(envX - 5) + " " + parseInt(envY + 19) + " l1.5 -3  M" + parseInt(envX - 9) + " " + parseInt(envY + 15) + " l3 -1.5  M" + parseInt(envX - 10) + " " + parseInt(envY + 10) + " l3 0  M" + parseInt(envX - 9) + " " + parseInt(envY + 5) + " l3 1.5 M" + parseInt(envX - 5) + " " + parseInt(envY + 1) + " l1.5 3 M" + parseInt(envX + 2) + " " + parseInt(envY + 3) + " l-2 7 l4 0";
			paper.path(eventPath).attr(generalStyle);
			
		}

		paper.text(x, parseInt(y) + parseInt(element.height/2) + 15, element.name).attr(textStyle);
		
	// Gateways
	} else if (element.type.toLowerCase().indexOf("gateway") >= 0) {
		var x = element.x;
		var y = parseInt(element.y) + element.height/2;
		var radHeight = element.height/2;
		var radWidth = element.width/2;
		var rhombus = "M" + x + " " + y + " l" + radWidth + " -" + radHeight + " l" + radWidth + " " + radHeight + " l-" + radWidth + " " + radHeight + " l-" + radHeight + " -" + radWidth;
		paper.path(rhombus)
				.attr(generalStyle);
		
		paper.text(parseInt(x) + parseInt(element.width) - 5, parseInt(y) + parseInt(element.height/2) -4, element.name).attr(textStyle).attr({'text-anchor': 'start'});

		// Exclusive?
		if (element.type == "exclusiveGateway") {
			var markerX = parseInt(element.x) + parseInt(element.width/2.6) -0.5;
			var markerY = parseInt(element.y) + parseInt(element.height/3) - 0.5;
			var marker1 = "M" + markerX + " " + markerY + " l10.5 16 z";
			var marker2 = "M" + markerX + " " + parseInt(parseInt(markerY) + 16.9) + " l10.5 -16 z";
			paper.path(marker1).attr(gatewayMarkerStyle);
			paper.path(marker2).attr(gatewayMarkerStyle);
		}

		// Parallel?
		if (element.type == "parallelGateway") {
			var markerX1 = parseInt(element.x) + parseInt(element.width/2) + 1;
			var markerY1 = parseInt(element.y) + parseInt(element.height/3) - 1;
			var marker1 = "M" + markerX1 + " " + markerY1 + " l0 16";

			var markerX2 = parseInt(element.x) + parseInt(element.width/3);
			var markerY2 = parseInt(element.y) + parseInt(element.height/2);
			var marker2 = "M" + markerX2 + " " + markerY2 + " l16 0";
			paper.path(marker1).attr(gatewayMarkerStyle);
			paper.path(marker2).attr(gatewayMarkerStyle);
		}

	// Pools
	} else if (element.type.toLowerCase().indexOf("participant") >= 0) {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				0)
			  .attr(generalStyle);
		var textX = parseInt(parseInt(element.x) + 10);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		paper.text(textX, textY, element.name).rotate(-90,x,200).attr(textStyle);			  

	// Lanes
	} else if (element.type.toLowerCase().indexOf("lane") >= 0) {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				0)
			  .attr(generalStyle);
		var textX = parseInt(parseInt(element.x) + 10);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		paper.text(textX, textY, element.name).rotate(-90,x,200).attr(textStyle);			  

	// Text Annotation?
	} else if (element.type.toLowerCase().indexOf("textannotation") >= 0) {

		// Drawing the Shape
		var x = parseInt(element.x) + 10;
		var y = element.y;
		var height = element.height;
		var pathSpec = "M" + x + " " + y + " l-10 0 l0 " + element.height + " l10 0";
		paper.path(pathSpec).attr(generalStyle);
		
		// Printing the Text
		var textX = parseInt(parseInt(element.x) + 5);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		var t = paper.text(textX, textY, element.textAnnotation).attr(textStyle).attr({'text-anchor': 'start'});			  
		textLineBreaker (t, element.textAnnotation, element.width);
		
	// Activities
	} else {
		
	var act = paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				5)
			  .attr(activityStyle);
		var textX = parseInt(parseInt(element.x) + parseInt(element.width)/2);
		var textY = parseInt(parseInt(element.y) + parseInt(element.height)/2);
		var t = paper.text(textX, textY, element.name).attr(textStyle);	
		textLineBreaker (t, element.name, element.width);

		act.hover(function () {
			act.attr({"stroke": "red"});
		  },
		  function () {
			act.attr({"stroke": "grey"});
		  }
		);
		
	}
	
}

function drawFlow (flow, pathSpec, paper) {
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
	
	if (flow.type == "sequence") { 
		// draw sequenceflow 
		var e = paper.path(pathString).attr(generalStyle).attr(sequenceFlowStyle),
			l = e.getTotalLength(),
		   to = 1;
	}
	
	if (flow.type == "association") { 
		var e = paper.path(pathString).attr("stroke-dasharray", ". "),
			l = e.getTotalLength(),
		   to = 1;
	
	}

	// Print the Text
	if (flow.name != undefined && flow.name != "") { 
		var textX = 0;
		var textY = 0;
		// going from left to right? (asking for more than 1px Difference due to possible inaccurateness in XML DI)
		if ((pathSpec[1].x - pathSpec[0].x) > 1) {
			textX = parseInt(pathSpec[0].x) + ((pathSpec[1].x - pathSpec[0].x) / 4);
			//alert (textX);
			textY = parseInt(pathSpec[0].y) - 10;
		// going from top to bottom / bottom to top...
		} else {
			textX = parseInt(pathSpec[0].x) + 5;
			textY = parseInt(pathSpec[0].y) + ((pathSpec[1].y - pathSpec[0].y) / 4);
		}
		
		paper.text(textX, textY, flow.name).attr({'text-anchor': 'start'});
	}
	   
}

function drawElement (data, element, paper) {
	// Find respective DI
	$(data).find("bpmndi\\:BPMNShape[bpmnElement='" + element.id + "']").each(function(){
		var $di = $(this);
		element.x = $(this).find('omgdc\\:Bounds').attr("x");
		element.y = $(this).find('omgdc\\:Bounds').attr("y");
		element.width = $(this).find('omgdc\\:Bounds').attr("width");
		element.height = $(this).find('omgdc\\:Bounds').attr("height");
		
		// get Label Position
		$(this).find("bpmndi\\:BPMNLabel").each(function() {
			element.labelX = $(this).find("omgdc\\:Bounds").attr("x");
			element.labelY = $(this).find("omgdc\\:Bounds").attr("y");
		});		

		elementSVG (element, paper);
	});
	
}

function parseBPMNXML (diagram, paper) {

$.get("http://localhost:8000/app/assets/bpmn/" + diagram + ".bpmn", function(data){
	var isCollaboration = false;

	// Find Collaboration (if existing)
	$(data).find("collaboration").each(function(){
		isCollaboration = true;
	});	
	
	// 	Find Processes
	$(data).find("process").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "process";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Tasks
	$(data).find("task").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "task";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Exclusive Gateways
	$(data).find("exclusiveGateway").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "exclusiveGateway";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Inclusive Gateways
	$(data).find("inclusiveGateway").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "inclusiveGateway";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Parallel Gateways
	$(data).find("parallelGateway").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "parallelGateway";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	
	
	
	// 	Find Startevents
	$(data).find("startevent").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "startevent";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Intermediate Throw Events
	$(data).find("intermediatethrowevent").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "intermediatethrowevent";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Endevents
	$(data).find("endevent").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "endevent";
		element.id = $elem.attr("id");
		element.name = $elem.attr("name");
		
		drawElement(data, element, paper);
	});	

	// 	Find Text Annotations
	$(data).find("textannotation").each(function(){
		var $elem = $(this);
		var element = new Object;
		element.type = "textannotation";
		element.id = $elem.attr("id");
		element.textAnnotation = $elem.find("text").text();
		
		drawElement(data, element, paper);
	});	
	

	// Find semantic Sequence Flows
	$(data).find("sequenceFlow").each(function(){
		var $edge = $(this);
		var flow = new Object;
		flow.id = $edge.attr("id");
		flow.type = "sequence";
		flow.name = $edge.attr("name");

		// Find respective DI
		var pathSpec = new Array();
		$(data).find("bpmndi\\:BPMNEdge[bpmnElement='" + flow.id + "']").each(function(){
			var $di = $(this);
			$di.find("omgdi\\:waypoint").each(function(){
				var waypoint = $(this);
				//alert(waypoint.attr("x"));	
				pathSpecElem = new Object();
				pathSpecElem.x = waypoint.attr("x");
				pathSpecElem.y = waypoint.attr("y");
				pathSpec.push(pathSpecElem);
			});
		
		drawFlow(flow, pathSpec, paper);
		});
	});

	// Find semantic Associations
	$(data).find("association").each(function(){
		var $edge = $(this);
		var flow = new Object;
		flow.id = $edge.attr("id");
		flow.type = "association";
		flow.name = $edge.attr("name");

		// Find respective DI
		var pathSpec = new Array();
		$(data).find("bpmndi\\:BPMNEdge[bpmnElement='" + flow.id + "']").each(function(){
			var $di = $(this);
			$di.find("omgdi\\:waypoint").each(function(){
				var waypoint = $(this);
				//alert(waypoint.attr("x"));	
				pathSpecElem = new Object();
				pathSpecElem.x = waypoint.attr("x");
				pathSpecElem.y = waypoint.attr("y");
				pathSpec.push(pathSpecElem);
			});
		
		drawFlow(flow, pathSpec, paper);
		});
	});

	// determine maxY
	var maxX = 0; // maximum X Value for Resizing Canvas later
	var maxY = 0; // maximum Y Value for Resizing Canvas later

	$(data).find("bpmndi\\:BPMNShape").each(function(){
		myX = parseInt($(this).find('omgdc\\:Bounds').attr("x")) + parseInt($(this).find('omgdc\\:Bounds').attr("width"));
		if (myX > maxX) {maxX = myX;}

		myY = parseInt($(this).find('omgdc\\:Bounds').attr("y")) + parseInt($(this).find('omgdc\\:Bounds').attr("height"));
		if (myY > maxY) {maxY = myY;}
	});
	
	paper.setSize (maxX + 10, maxY + 10);
	
	});

	
}




