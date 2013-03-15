'use strict'

angular.module('camundaorg.directives').directive('pipe', function ($http) {
  return {
    scope: {
      items : "&"
    },
    link: function (scope, element, attrs) {
      var url = attrs.pipeUrl;
      var truncate = attrs.truncate ? attrs.truncate :  150;

      scope.items = [];
      var element = $(element);
      scope.decode = function (theText) {
        return $('<div />').html(theText.substr(0, truncate)).text() + " ...";
      };

      // get pipe content via jsonp, using jquery because angular http seems to have a bug here:
      // getting a syntax error for our pipes
      $.getJSON(url,
        function(data) {
          scope.items = data.value.items;
          scope.$digest();
        }
      );
    }
  };
});