// DocPad Configuration

var docpadConfig = {

  // Helper Url
  // Used for subscribing to newsletter, account information, and statistics etc
  helperUrl: 'https://camunda.org/helper/',

  // Collections
  // A hash of functions that create collections
  collections: {
    mainSections: function(database) {
      return database.findAllLive({ relativeOutDirPath: 'pages/' });
    }
  },

  // Use to define your own template data and helpers that will be accessible to your templates
  // Complete listing of default values can be found here: http://docpad.org/docs/template-data
  templateData: {

    //// Site Properties /////////////////////////////////////
    site: {

      // The production url of our website
      url: "http://website.com",

      styles: [
        "assets/vendor/bootstrap/css/bootstrap.min.css",
        "assets/vendor/bootstrap/css/bootstrap-responsive.min.css",
        "assets/css/cabpmn.css",
        "assets/css/app.css"
      ],

      scripts: [
        // todo make path separator aware
        "assets/vendor/jquery.min.js",
        "assets/vendor/bootstrap/js/bootstrap.min.js",
        "assets/vendor/log.js",
        "assets/vendor/angular/angular.min.js",
        "assets/vendor/angular/angular-resource.min.js",
        "assets/vendor/angular/angular-bootstrap.min.js",

        "assets/app/directives/ngmif.js",
        "assets/app/directives/focused.js",
        "assets/app/app.js",

        // not important, load last
        "assets/vendor/analytics/analytics.js"
      ],

      title: "camunda BPM",

      description: "The home of the camunda BPM platform",

      // website keywords (separated by commas)
      keywords: "camunda, camunda.org, bpm, engine, platform, process, automation, community",

      author: "camunda community",
      email: "community@camund.org",

      copyright: "© camunda services GmbH 2013"
    },

    //// Helper Functions /////////////////////////////////////

    getPreparedTitle: function() {
      var document = this.document,
          documentTitle = document.title,
          site = this.site,
          siteTitle = site.title;

      if (documentTitle) {
        return documentTitle + " | " + siteTitle;
      } else {
        return siteTitle;
      }
    },

    getPreparedDescription: function() {
      var document = this.document,
          documentDescription = document.description,
          site = this.site,
          siteDescription = site.description;

      return documentDescription || siteDescription;
    },

    getPreparedKeywords: function() {
      var document = this.document,
          documentKeywords = document.keywords,
          site = this.site,
          siteKeywords = site.keywords;

      return (siteKeywords || []).concat(documentKeywords || []).join(", ");
    },

    pathSeparator: function(url) {

      var uriParts = (url || this.document.url.replace(this.site.url)).split("/");

      function repeat(s, n) {

        var a = [];

        for (var i = 0; i < n; i++) {
          a.push(s);
        }

        return a.join('');
      }

      return repeat('../', uriParts.length - 1);
    },

    docUrl: function(url) {
      var documentUrl = this.document.url;

      return this.pathSeparator(documentUrl) + url;
    },

    relativize: function(paths, separator) {
      var a = [];

      for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        if (/^\//.test(p)) {
          a.push(p);
        } else {
          a.push(separator + p);
        }
      }

      return a;
    },

    commonStyles: function() {
      return this.relativize(this.site.styles, this.pathSeparator());
    },

    commonScripts: function() {
      return this.relativize(this.site.scripts, this.pathSeparator());
    }
  },

  // =================================
  // Event Configuration

  // Locale Code
  // The code we shall use for our locale (e.g. `en`, `fr`, etc)
  // If not set, we will attempt to detect the system's locale, if the locale can't be detected or if our locale file is not found for it, we will revert to `en`
  localeCode: null,

  // Environment
  // Which environment we should load up
  // If not set, we will default the `NODE_ENV` environment variable, if that isn't set, we will default to `development`
  env: null,

  // Environments
  // Allows us to set custom configuration for specific environments
  environments: null,
  development: null,

  maxAge: false // default

};

module.exports = docpadConfig;