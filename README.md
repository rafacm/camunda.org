The sources of the camunda.org homepage.

Start hacking
=============

In order to start hacking the camunda.org homepage, you need a runnung HTTP server. 

Using the Ruby asdf tool 
------------------------
An easy way to achieve this without any hazzle is using the simplistic asdf tool written in ruby.

Install [Ruby](http://www.ruby-lang.org/en/downloads/).

    $ gem install asdf
    $ asdf

Using node.js
-------------

See [tnws](https://github.com/rodw/tiny-node.js-webserver)

    $ curl -o "~/bin/tnws" https://raw.github.com/rodw/tiny-node.js-webserver/master/tnws.coffee
    $ tnws

Using apache tomcat
-------------------

Copy the content of this repository to the webapps/ROOT directory of your apache tomcat server.




