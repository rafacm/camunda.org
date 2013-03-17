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

TODOs
-----

Add Downloads page (Stefan am Samstag)

Implement
  * Landing page: Add Links, comment „how does it work auskommentieren“ - Daniel
  * ~~Complete "Getting started" - Daniel~~
  * ~~BPMN 2.0 Reference rename packages and fix dead Links~~
    * ~~Link has changed to http://localhost:8000/app/implement-bpmn.html~~
    * ~~directive app-source (fix line numbers)~~
    * ~~(BPMN symbol reference)~~ (won't fix)
  * Java Reference
    * ~~Add http://localhost:8000/app/implement-java.html to menu and footer  (Bernd)~~
    * ~~Add Process Diagram API Link (Bernd)~~
    * Add Deployment Infos (skipped from user guide till now)
    * ~~Add ProcessApplication development Reference (-> Daniel)~~
  * ~~cleanup Menu (-> Roman)~~  
  
Design
  * ~~remove "run" directive~~
  * ~~Remove Cycle Setup Menu Entry (Jakob)~~
  * ~~Complete Cycle Tutorial (Jakob)~~
  * Add „creating BPMN 2.0 diagrams“ (Jakob)
  * ~~Remove BPMN 2 by example chapters OR FIX RENDERER (Jakob)~~

Community 
  * Add & embedd additional Forum boards & make initial postings, Open in Google Link (Daniel, Handshake Jakob)
  * ~~Team Page~~
    * ~~Complete~~
    * ~~Fix layout~~
  * Add Contributions Page (-> Daniel)
  * ~~Fix Meeting Registration~~
  * ~~Add Newsletter (Jakob)~~
  * explain Vision (Jakob)
 
Support 
  * Fix Links (Jakob)

Homepage 
  * Animate Numberguess  (Daniel)
    * move gateway lable above GW
  * ~~Add social Media Links (Roman)~~
  * ~~Fix Blogpost embedding or hard-link initial blogpost (Andreas)~~
  * ~~Fix Meetings View (or hard-link) (Jakob)~~
  * ~~Add "Fork Me on Github" -> Fixed layout~~

Footer
  * ~~Fix Links (Roman)~~

Others
 * Complete Google+ Page
 * Write initial Blogpost (incl. Added Value Overview) (Daniel & Jakob)
 * Fix browser compatibility (Roman)
   * IEx >= 9 (Number guessing, ~~Meetings(Jakob)~~, Renderer?)
   * IEx < 9 
   * ~~Mobile~~
 * ~~Menubar resizing Issue! (Daniel)~~

 * ~~Fix Javascript loading issue~~
 * Blog Post: Activiti Migration Guide