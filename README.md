# Visual Compiler

## Installation

### Node package only

Install nodejs:

~~~bash
#Fedora/CentOS
$ sudo yum install nodejs

#OSX
$ brew install node
~~~

Run bundle

~~~bash
$ node dist/instant-bundle.js
~~~


### Self hosted web version

[Install node.js](#node-package-only)

Install Node Package Manager (npm) and tar:

~~~bash
#Fedora/CentOS
$ sudo yum install npm tar

#OSX
# it comes shipped with node
~~~

Update it:

~~~bash
#Fedora/CentOS
$ sudo npm install -g npm

#OSX
$ npm install -g npm
~~~

Install [bower](http://bower.io/) and [gulp](http://gulpjs.com/) globally:

~~~bash
#Fedora/CentOS
$ sudo npm install -g gulp bower

#OSX
$ npm install -g gulp bower
~~~

Install project node dependencies locally:

~~~bash
#From project root

$ npm install
~~~

Install project bower dependencies locally:

~~~bash
#From project root

$ bower install
~~~

Run browsersync server

~~~bash
#From project root

$ gulp serve
~~~

