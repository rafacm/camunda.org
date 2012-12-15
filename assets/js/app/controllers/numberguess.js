'use strict';

angular.module('camundaorg.controllers');

function NumberguessAppController($scope, $http, $element) {

  $scope.state = "inactive";

  $scope.paper = Raphael("animations", 900, 220);

  $scope.highlights = [];

  $scope.highlightActive = {
    stroke: "Darkorange",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.7,
    fill: "Darkorange",
    "fill-opacity": 0.1
  };

  $scope.highlightDone = {
    stroke: "green",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.5            
  };

  $scope.highlightToken = {
    stroke: "Darkorange",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-opacity" : 0.7,
    fill: "Darkorange",
    "fill-opacity": 0.7          
  };

  $scope.layout = {
    "StartEvent_1" : {
                            "x" : 77,
                            "y" : 77,
                            "width" : 36.0,
                            "height" : 36.0,
                      },
    "Sequenceflow_1" :  [ 
                            { "x" : 113.0, "y" : 95 }, 
                            { "x" : 167, "y" : 95 }, 
                        ],
    "ServiceTask_1" : {
                            "x" : 167.0,
                            "y" : 51,
                            "width" : 110.0,
                            "height" : 89.0,
                      }      
  };

  $scope.inactive = function() {
    return $scope.state == "inactive";
  };

  $scope.showContinueButton = function() {
    return $scope.state != "inactive";
  };

  $scope.startDialog = function() {
    return $scope.state == "startDialog";
  };

  $scope.showStartDialog = function() {
    $scope.state = "startDialog";
    var layout = $scope.layout["StartEvent_1"];
    var rad = layout.width / 2;
    var highlight = $scope.paper.circle((layout.x+rad), (layout.y+rad), rad).attr($scope.highlightActive);
    $scope.highlights.push(highlight);
  };

  $scope.cancel = function() {
    $scope.state = "inactive";
  };

  $scope.showGenerateRandomNumber = function() {
    $scope.state = "showGenerateRandomNumber";
    var layout = $scope.layout["ServiceTask_1"];
    $scope.paper.rect(layout.x, layout.y, layout.width, layout.height, 5).attr($scope.highlightActive);
    $("#ServiceTask_1").css("display", "block");
  };


  $scope.startProcess = function() {

   // $http.post("/process-engine-rest/process/numberGuessing")
   // .success(function(data) {
      $scope.state = "";
      $scope.animate("Sequenceflow_1", $scope.showGenerateRandomNumber);
    //}).error(function() {
      // TODO: error handling
    //});

  };

  $scope.animate = function(element, donefn) {

    angular.forEach($scope.highlights, function(highlight) {
      highlight.attr($scope.highlightDone);
    });

    var pathSpec = $scope.layout[element];
    var pathString = "M"+pathSpec[0].x+","+pathSpec[0].y;

    for (var i=1; i<pathSpec.length; i++) { 
      if(i==1) {
        pathString += "L";
      }
      pathString += pathSpec[i].x+","+pathSpec[i].y;
      if((i+1) != pathSpec.length) {
        pathString += " ";
      }
    }
    
    // draw sequenceflow highlight
    var e = $scope.paper.path(pathString).attr($scope.highlightActive).attr("arrow-end", "classic-midium-long"),
        l = e.getTotalLength(),
       to = 1;
    
    $scope.paper.customAttributes.along = function (a) {
      var p = e.getPointAtLength(a * l);
      return {
        transform: "t" + [p.x, p.y - 10] + "r" + p.alpha
        };
    };

    // draw and animate token
    var c = $scope.paper.ellipse(0, 0, 5, 5).attr({
      along: 0
    }).attr($scope.highlightToken).animate({
      along: to
    }, 1500, function() {
      // remove token
      e.attr($scope.highlightDone);
      c.remove();
      donefn();
    });
      
  }
  
}