'use strict';

angular.module('camundaorg.controllers', []);

function HomeController($scope) {
  $scope.$emit("navigation-changed");

  $(".tweet").tweet({
     query: "#activiti",
            join_text: "auto",
            avatar_size: 32,
            count: 3,
            auto_join_text_default: ",", 
            auto_join_text_ed: "",
            auto_join_text_ing: "",
            auto_join_text_reply: "",
            auto_join_text_url: "",
            loading_text: "Loading Tweets..."
     });


    var ROOT = (function () {
        var html = document.documentElement;
        var htmlScrollTop = html.scrollTop++;
        var root = html.scrollTop == htmlScrollTop + 1 ? html : document.body;
        html.scrollTop = htmlScrollTop;
        return root;
    })();

    // may be recalculated on resize
    var limit = (document.body.scrollHeight - $(window).height()) * 7;
    var visible = false;
    var last = +new Date;
    var didScroll = false; 

    $(window).scroll(function(){
        didScroll = true; 
    })

    setInterval(function(){
        if(didScroll){
            didScroll = false; 
            if (visible && ROOT.scrollTop < limit) {
                hideCredit(); 
                visible = false; 
            } else if (!visible && ROOT.scrollTop > limit) {
                showCredit(); 
                visible = true; 
            }
        }
    }, 30);


    function hideCredit(){
    	$("#continue-game").addClass("hidden");
    }

    function showCredit(){
        $("#continue-game").removeClass("hidden");
    }


  
}


