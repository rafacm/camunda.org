camunda.org
===========

The sources of the camunda.org homepage.

The page is built using [docpad.org](http://docpad.org).

Overview
========

The `site/src/` folder contains the sources for the website.

The `dev/` folder contains utilities for development.

Start hacking
=============

In order to start hacking the camunda.org homepage, you first need to setup docpad.

1. install [node.js](http://nodejs.org/) if you haven't already got it.
2. inside your terminal, navigate to the `site/` folder inside the repository. Type `npm install`
3. run docpad using `docpad run`

Go to http://localhost:9778/

Have fun.

Troubleshooting
===============

In case you get the following error when executing `docpad run`

```
TypeError: Object #<DocPad> has no method 'parseDocumentDirectory'
    at PartialsPlugin.populateCollections (...)
```

Try the following workaround:

1. Delete the directory `site/node_modules`: `~/docs.camunda.org/site$ rm -rf node_modules`
2. Install docpad *globally*: `~/docs.camunda.org/site$ sudo install -g docpad@6.43`
3. Update: `~/docs.camunda.org/site$ npm update`
4. Use the *globally installed* docpad: `~/docs.camunda.org/site$ docpad run`

