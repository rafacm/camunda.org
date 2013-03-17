Contribution Guidelines
=======================

> This page is still work in Progress.

When you contribute your work on a feature or bug fix consider the following

* Coding styles:
** camunda modeler:
*** tabs / tab size 4 (all files)
** other projects: 
*** tabs as spaces / tab size 2 (all files)
*** if you use eclipse, please import our [formatter templates](https://github.com/camunda/camunda-bpm-platform/tree/master/settings/eclipse)

* As general guide lines consider
** JS: https://github.com/rwldrn/idiomatic.js/
** Java: http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html

* Provide test cases which make sure your feature works (__AND__ will not occasionally be broken in the future)
* Make sure the local test suite passes
* Before you create a pull request
* Review your changes (missing files?)
* If you created a number of commits, [squash](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) your work into a few commits only.
* Create commit messages that adhere to [our commit message style](COMMIT_MESSAGES.md). Be verbose, i.e. use the message body to describe what you did and why.
