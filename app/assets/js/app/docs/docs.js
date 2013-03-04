/**
 * Search and linking specific stuff
 */

// (function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.directives");

  var PagesProducer = function() {

    var Pages = function(pages) {
      this.pages = pages;
      this.sections = this.buildSections(pages);
    };

    Pages.prototype.buildSections = function(pages) {
      var sections = {};

      for (var i = 0, p; !!(p = pages[i]); i++) {
        var section = getSection(p.section);

        section.pages.push(p);
        section.pageById[p.id] = p;
      }

      function getSection(name) {
        var section = sections[name];
        if (!section) {
          sections[name] = section = {
            name: name,
            pages: [],
            pageById: {}
          };
        }

        return section;
      }

      return sections;
    };

    Pages.prototype.getAll = function(sectionId) {
      var section = this.sections[sectionId];

      if (!section) {
        return null;
      }

      return section.pages;
    };

    Pages.prototype.get = function(sectionId, pageId) {
      var section = this.sections[sectionId];

      if (!section) {
        return null;
      }

      return section.pageById[pageId];
    };

    return new Pages(CAM_PAGES);
  };

  var FormSearchController = function FormSearchController($scope, $location, Pages) {

    $scope.$watch(function getUrl() { return $location.path(); }, function(newValue) {
      updateSearch();
    });

    $scope.updateSearch = function() {
      updateSearch();
    };

    function updateSearch() {
      var allPages = Pages.getAll($scope.section),
          categories = $scope.categories = [],
          cache = {},
          pages = $scope.pages = [],
          search = $scope.search,
          bestMatch = $scope.bestMatch = { rank: 0, page: null };

      angular.forEach(allPages, function(page) {
        var match = rank(page, search);
        console.log(search, page, match);
        if (!match) {
          return;
        }

        if (match.rank > bestMatch.rank) {
          bestMatch = match;
        }

        var category = getCategory(page.category);
        if (category) {
          category.pages.push(page);
        } else {
          pages.push(page);
        }
      });

      function getCategory(categoryName) {
        var category;

        if (categoryName) {
          category = cache[categoryName];
          if (!category) {
            category = cache[categoryName] = {
              name: categoryName,
              pages: []
            };

            categories.push(category);
          }
        }

        return category;
      }

      function rank(page, terms) {
        var ranking = { page: page, rank:0 },
          keywords = page.keywords || "",
          title = (page.shortName || page.name || "").toLowerCase();

        if (!terms) {
          return ranking;
        }

        angular.forEach(terms.toLowerCase().split(' '), function(term) {
          var index;

          if (ranking) {
            if (keywords.indexOf(term) == -1) {
              ranking = null;
            } else {
              ranking.rank ++; // one point for each term found
              if ((index = title.indexOf(term)) != -1) {
                ranking.rank += 20 - index; // ten points if you match title
              }
            }
          }
        });

        return ranking;
      }
    }
  };

  var FormSearchDirective = function FormSearchDirective() {
    return {
      restrict: 'EAC',
      controller: FormSearchController,

      link: function(scope, element, attributes) {
        scope.section = attributes["section"];
      }
    };
  };

  module
    .service("Pages", PagesProducer)
    .controller("FormSearchController", FormSearchController)
    .directive("formSearch", FormSearchDirective);

// })(angular, $);