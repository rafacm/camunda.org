camunda.org
===========

The sources of the camunda.org homepage.

The page is built using static HTML files, some JavaScript and CSS.
We make heavy use of [angularjs](http://angularjs.org/), [jQuery](http://jquery.com/) and [twitter bootstrap](http://twitter.github.com/bootstrap).
Some elements of the homepage are copied from the angularjs homepage.

Overview
========

The `app/` folder contains the actual HTML sources.

The `dev/` folder contains utilities for development.

Start hacking
=============

In order to start hacking the camunda.org homepage, you need a runnung HTTP server.

Using node.js
-------------

The `dev/` folder contains a file named `web-server.js` which provides an implementation of an HTTP server on top of node.js.

1. install [node.js](http://nodejs.org/)
2. run `$ node dev/web-server.js`
3. access the page at [http://localhost:8000/app/index.html](http://localhost:8000/app/index.html)

NOTE: The web-server.js script is copied from the [angularjs seed](https://github.com/angular/angular-seed) project.

Using the Ruby asdf tool
------------------------
Another easy way to startup a webserver serving static content is the simplistic asdf tool written in ruby.

1. Install [Ruby](http://www.ruby-lang.org/en/downloads/).
2. Install the asdf gem: `$ gem install asdf`
3. Start asdf: `$ asdf`
4. Access the page at [http://localhost:9292/app/index.html](http://localhost:9292/app/index.html)

Using apache tomcat
-------------------
You can of course use any HTTP server that is able to serve static content. Since most of us come from a Java background, some might be tempted to use Apache Tomcat and copy the contents of the `app/` folder to the `webapps/ROOT` directory... but that is probably just a rumour.
