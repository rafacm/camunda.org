/**
 * Docs Navigation and Docs linking specific stuff
 */

(function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.directives");

  // copied from angular.js docs
  
  var FocusedDirective = function($timeout) {
    return function(scope, element, attrs) {
      element[0].focus();
      element.bind('focus', function() {
        scope.$apply(attrs.focused + '=true');
      });
      element.bind('blur', function() {
        // have to use $timeout, so that we close the drop-down after the user clicks,
        // otherwise when the user clicks we process the closing before we process the click.
        $timeout(function() {
          scope.$eval(attrs.focused + '=false');
        });
      });
      scope.$eval(attrs.focused + '=true');
    };
  };

  module
    .directive("focused", FocusedDirective);

})(window.angular, window.jQuery);