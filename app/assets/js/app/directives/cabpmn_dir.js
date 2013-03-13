'use strict'

angular.module('camundaorg.directives')

.directive('bpmnRender', function() {
  require({
        baseUrl: "./",
        packages: [
             { name: "dojo", location: "assets/js/lib/dojo/dojo"},
             { name: "dojox", location: "assets/js/lib/dojo/dojox"},
             { name: "bpmn", location: "assets/js/app/bpmn"}]
  });
  return {
    link: function(scope, element, attrs) {
      var bpmnResource = attrs.bpmnRender;

      require(["bpmn/Bpmn"], function(Bpmn) {
            new Bpmn().renderUrl("assets/bpmn/" + bpmnResource + ".bpmn", {
                diagramElement : element[0].id,
                overlayHtml : '<div style="position: relative; top:100%"></div>'
            }).then(function (bpmn){
                scope.bpmn = bpmn;
                //bpmn.zoom(0.8);
                //bpmn.annotate("reviewInvoice", '<span class="bluebox"  style="position: relative; top:100%">New Text</span>', ["highlight"]);
            });
        });
    }
  }
})
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

      $.get("../app/assets/bpmn/" + bpmnResource + ".bpmn", function(data){
        
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
.directive('bpmnReferenceList', function() {
  return {
    link: function(scope, element, attrs) {
    
    
    


    }
  }
})
.directive('bpmnTutorial', function($location) {
  return {
    link: function(scope, element, attrs) {
		
		$('.tutPop', element).popover({
			"trigger": "hover",
			"placement": "bottom"
		});

    // update active entry in Breadcrumb

    var link = '#' + $location.path();

    // Remove any active entry marker from list
    $('.bpmnSymbolLink').parent().removeClass("active");

    if (link == '#/design/reference') {
      $('#breadcrumbOverview').text('Symbol Reference');
      $('#breadcrumbOverview').addClass('active');
      $('#breadcrumbSymbol').text('');
    } else {

      $('#breadcrumbOverview').removeClass('active');
      $('#breadcrumbOverview').html('<a href="design-reference.html#/design/reference">Symbol Reference</a> <span class="divider">/</span>');
      // Highlight active entry in list
      $('a[href="' + link + '"]').parent().addClass("active");
      // update Breadcrumb active entry
      $('#breadcrumbSymbol').text($('a[href="' + link + '"]').text());

    }



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
})
.directive('bpmnSymbol', function() {
  return {
    link: function(scope, element, attrs) {
		var bpmnSymbol = attrs.bpmnSymbol;
		var bpmnSymbolName = attrs.bpmnSymbolName;
		drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, element);
    }
  }
})
.directive('imgThumb', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);
      
      $(element).append('<a href="#myModal_' + attrs.id +'" data-toggle="modal"><img src="' + attrs.imgSrc +'"/></a><div class="center"><p style="padding-top:5px; font-size:90%"><i class="icon-zoom-in"></i> click to enlarge</p></div>');
      $(element).append('<div id="myModal_' + attrs.id +'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
  + '<div class="modal-body">'
    + '<img src="' + attrs.imgSrc +'"/>'
    + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
    + '</div>'
    + '</div>');
    }
  }
})
.directive('camundaEvents', function() {
  return {
    link: function(scope, element, attrs) {

      var m_names = new Array("January", "February", "March", 
      "April", "May", "June", "July", "August", "September", 
      "October", "November", "December");

      $.getJSON('http://php.camunda.com/rest/meeting.php', function(data) {
      //$.get('assets/json/events.json', function(data) {
          
          $.each( data.events, function( key, value ) {

            var myDate = new Date(value.event.date);
            var myDateString = value.event.date;

            var myRow = "<td>" + myDateString + "</td><td><img src='assets/img/app/community/meetings/" + value.event.country + ".png' > " + value.event.country + "</td><td>" + value.event.city + "</td><td>" + value.event.subject + "</td><td>" + value.event.attendees + " attendees</td><td>" + parseInt(value.event.seats - value.event.attendees)  + " seats left</td>";
            var selectDate = '<td><a style="color:black;" href="community-meetings-single.html?id=' + value.event.id +'" role="button" class="btn">Register</a></td>';
            /*
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
            */
            myRow = "<tr>" + selectDate + myRow + "</td></tr>";
            element.append(myRow);
/*
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
*/
            
          });

      });
    }
  }
})
.directive('meeting', function() {
  return {
    link: function(scope, element, attrs) {

      // Helper for getting Get param
      var HTTP_GET_VARS=new Array();
      var strGET=document.location.search.substr(1,document.location.search.length);
      if(strGET!='')
          {
          var gArr=strGET.split('&');
          for(var i=0;i<gArr.length;++i)
              {
              var v='';var vArr=gArr[i].split('=');
              if(vArr.length>1){v=vArr[1];}
              HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
              }
          }
        var meetingId = HTTP_GET_VARS["id"];

var m_names = new Array("January", "February", "March", 
      "April", "May", "June", "July", "August", "September", 
      "October", "November", "December");

        $.getJSON('http://php.camunda.com/rest/meeting.php?id=' + meetingId, function(data) {
          $.each( data.events, function( key, value ) {
          
          $('.mCountry').append(value.event.country);
          $('.mCity').text(value.event.city);
          $('.mDate').text(value.event.date);
          $('.mSubject').append(value.event.subject);
          $('.mText').append(value.event.text);
          $('.mPlace').append(value.event.place + ' (<a target="_blank" href="https://maps.google.de/maps?q=' + value.event.place + '">Google Maps</a>)');

            if (parseInt(value.event.seats - value.event.attendees) < 1) {
              $('.mSeats').text ('Sorry, there are no seats left :-(');
              $('#mSubmit').attr('disabled', 'true');
            } else {
              $('.mSeats').text('Currently we have ' + value.event.attendees + ' attendees. There are still ' + parseInt(value.event.seats - value.event.attendees) + ' seats left!');
            }

            $('#mSubmit').on('click', function(event) {
              var myName =  $('#mName').val();
              var myEmail = $('#mEmail').val();

              $('#formContainer').append('<p id="status">Processing...</p>');
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
                      $('#status').text(myName + " has been registered - You will get your confirmation via email. See you there!" + data);
                      $('#mName').val("");
                      $('#mEmail').val("");
                    }
               });
             
            });   

          });

      });

     
  }
}
})
.directive('camTweets', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);

    $(element).tweet({
          join_text: "auto",
          query: "#camunda",
          avatar_size: 30,
          count: 3,
          loading_text: "loading tweets..."
        });      
     
    }
  }
})
.directive('camBlogs', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);

     $.getFeed({
        url: 'http://www.bpm-guide.de/feed/?lang_view=en',
        success: function(feed) {
        
            $(element).append('<h2>'
            + '<a href="'
            + feed.link
            + '">'
            + feed.title
            + '</a>'
            + '</h2>');
            
            var html = '';
            
            for(var i = 0; i < feed.items.length && i < 5; i++) {
            
                var item = feed.items[i];
                
                html += '<h3>'
                + '<a href="'
                + item.link
                + '">'
                + item.title
                + '</a>'
                + '</h3>';
                
                html += '<div class="updated">'
                + item.updated
                + '</div>';
                
                html += '<div>'
                + item.description
                + '</div>';
            }
            
            $(element).append(html);
        }    
    });     
     
    }
  }
})
.directive('vision', function() {
  return {
    link: function(scope, element, attrs) {
/*
    $('a').fadeIn('slow', function() {
        alert ("hi");
      });

    var controller = $.superscrollorama();
    controller.addTween('a', 
      TweenMax.from($('a'), .5, {css:{opacity:0}}));     
    
    controller.addTween('#fade2', 
      TweenMax.from($('#fade2'), .5, {css:{opacity:0}}));

    controller.addTween('#fade5', 
      TweenMax.from($('#fade5'), .5, {css:{opacity:0}}));    
  */

  
  $('#explainScalable').popover({
    "title":"Scalable Business Model",
    "trigger": "hover",
    "content": "<div class='explain' ><p>BPM cannot help you inventing a great product or persuading your customers to buy it.</p><p>But if you do have the right product and a market to conquer, BPM can provide you with the infrastructure you need to turn a corner shop into a big yet profitable business.</p><p>Why BPM? To scale up your business model!</p></div>",
    "html": true
  });
    }
  }
})

