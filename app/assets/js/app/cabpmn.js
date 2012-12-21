var highlightActive = {
    stroke: "grey",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.7
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
			  .attr(highlightActive);
	// Gateways
	} else if (element.type.toLowerCase().indexOf("gateway") >= 0) {
		var x = element.x;
		var y = parseInt(element.y) + element.height/2;
		var radHeight = element.height/2;
		var radWidth = element.width/2;
		var rhombus = "M" + x + " " + y + " l" + radWidth + " -" + radHeight + " l" + radWidth + " " + radHeight + " l-" + radWidth + " " + radHeight + " l-" + radHeight + " -" + radWidth;
		paper.path(rhombus)
				.attr(highlightActive);
	// Activities
	} else {
		paper.rect(
				element.x, 
				element.y, 
				element.width, 
				element.height, 
				5)
			  .attr(highlightActive);
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




