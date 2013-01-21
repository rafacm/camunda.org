'use strict'

angular.module('camundaorg.directives')

.directive('bpmnSrc', function() {
  return {
    link: function(scope, element, attrs) {

    	var bpmnResource = attrs.bpmnSrc;
		
		bpmn(bpmnResource, element);
		//$('body').scrollspy('refresh');
    }
  }
})
.directive('bpmnRun', function() {
  return {
    scope: true,
    transclude: true, 
    template: '<div><div ng-transclude></div><button class="btn btn-primary" ng-click="startProcess()"><i class="icon-play"></i> Play</button></div>',
    link: function(scope, element, attrs) {

      var bpmnResource = attrs.bpmnSrc;

      $.get("http://localhost:8000/app/assets/bpmn/" + bpmnResource + ".bpmn", function(data){
        
        scope.processDefinition = CAM.transform(data)[0];

        if(!scope.startProcess) {
          scope.startProcess = function() {
             var execution = new CAM.ActivityExecution(scope.processDefinition);
             execution.variables["paperId"] = element.attr("id");
              execution.start();
          }
        }

    });
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
}).directive('bpmnSymbol', function() {
  return {
    link: function(scope, element, attrs) {
		var bpmnSymbol = attrs.bpmnSymbol;
		var bpmnSymbolName = attrs.bpmnSymbolName;
		drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, element);
    }
  }
})
.directive('camundaEvents', function() {
  return {
    link: function(scope, element, attrs) {

      var m_names = new Array("January", "February", "March", 
      "April", "May", "June", "July", "August", "September", 
      "October", "November", "December");

      $.getJSON('http://php.camunda.com/rest/meetings.php', function(data) {
      //$.get('assets/json/events.json', function(data) {
          
          $.each( data.events, function( key, value ) {

            var myDate = new Date(value.event.date);
            var myHours = myDate.getHours();
            if (myHours < 10) myHours = "0" + myHours;
            var myMinutes = myDate.getMinutes();
            if (myMinutes < 10) myMinutes = "0" + myMinutes;
            var myDateString = myDate.getDate() + "-" + m_names[myDate.getMonth()] + "-" + myDate.getFullYear() + " " +  myHours + ":" + myMinutes;

            var myRow = "<tr><td>" + myDateString + "</td><td>" + value.event.country + "</td><td>" + value.event.city + "</td><td>" + value.event.subject;
            var selectDate = '<td><a href="#myModal' + value.event.id +'" role="button" class="btn" data-toggle="modal">Register</a></td>';
            var seatsInfo = "";
            var disabled_formelement = "";
            if (parseInt(value.event.seats - value.event.attendees) < 1) {
              seatsInfo = 'Sorry, there are no seats left :-(';
              disabled_formelement = "disabled";
            } else {
              seatsInfo = 'Currently we have ' + value.event.attendees + ' attendees. There are still ' + parseInt(value.event.seats - value.event.attendees) + ' seats left!';
            }

            var myModal = '<div id="myModal' + value.event.id +'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"><h3 id="myModalLabel">' + value.event.subject + '</h3></div><div class="modal-body">' + 
              '<p>' + myDateString + '<br/>' + value.event.place + ' (<a target="_blank" href="https://maps.google.de/maps?q=' + value.event.place + '">Google Maps</a>)' +
              '<p>' + value.event.text + '</p>' +  
              '<div id="formContainer_' + value.event.id +'">' + 
              '<form id="registerForm_' + value.event.id +'" >'  + 
                '<fieldset>' + 
                '<legend>Register Now:</legend>' +
                '<p>' + seatsInfo + '</p>' + 
                '</p>' +                 
                '<label></label>' + 
                '<input ' + disabled_formelement + ' class="required registerForm_' + value.event.id +'" id="name_' + value.event.id + '" type="text" placeholder="Name">' + 
                '<label></label>' + 
                '<input ' + disabled_formelement + ' class="required email registerForm_' + value.event.id +'" id="email_' + value.event.id + '" type="text" placeholder="Email">' + 
                '</fieldset>' + 
              '</form></div>' + 
              '</div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>' + 
              '<button disabled id="submit_' + value.event.id + '" class="btn btn-primary registerForm_' + value.event.id +'">Register now</button></div></div>';
            myRow = myRow + selectDate + "</td></tr>";
            element.append(myRow);

            if (parseInt(value.event.seats - value.event.attendees) < 1) {
              $('.registerForm_' + value.event.id).attr('disabled', 'disabled');
            }
            $("#meetingsContainer").append(myModal);
            $('#name_' + value.event.id).on('keyup', function(event) {
              //alert($('#registerForm_' + value.event.id).validate().element('#name_' + value.event.id));
              if ($('#registerForm_' + value.event.id).valid()) {
                $('#submit_' + value.event.id).removeAttr('disabled');
              } else {
                $('#submit_' + value.event.id).attr('disabled', 'disabled');
              }
            });

            $('#submit_' + value.event.id ).on('click', function(event) {
              var myName =  $('#name_' + value.event.id).val();
              var myEmail = $('#email_' + value.event.id).val();

              $('.registerForm_' + value.event.id).attr('disabled', 'disabled');
              $('#formContainer_' + value.event.id).append('<p id="status_' + value.event.id +'">Processing...</p>');
              // alert (myName + myEmail);
             // HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
               $.ajax({
               // pfad zur PHP Datei (ab HTML Datei)
                    url: "http://php.camunda.com/rest/register.php",
               // Daten, die an Server gesendet werden soll in JSON Notation
                    data: {id: value.event.id, name: myName, email: myEmail},
                    datatype: "jsonp",
               // Methode POST oder GET
               type: "POST",
               // Callback-Funktion, die nach der Antwort des Servers ausgefuehrt wird
                    success: function(data) { 
                      //alert ("hi");
                      $('#status_' + value.event.id).text("Thank you! You will get your confirmation via email. See you there!" + data);
                    }
               });
             
            });
            
          });

      });
    }
  }
})