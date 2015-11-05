# Visual Compiler

## Installation

### Node package only

Install nodejs, Package Manager (npm) and tar:

~~~bash
#Fedora/CentOS
$ sudo yum install nodejs npm tar

#OSX
$ brew install node
~~~

Update npm:

~~~bash
#Fedora/CentOS
$ sudo npm install -g npm

#OSX
$ npm install -g npm
~~~

Install project node dependencies locally:

~~~bash
#From project root

$ npm install
~~~

Exec Makefile:

~~~bash
#From project root

$ make
~~~

Generate llvm or jvm code for .ins file:

~~~bash
#From project root

$ ./insc_jvm codefile.ins #generates codefile.j and code Codefile.class
$ ./insc_llvm codefile.ins #generates codefile.ll and code codefile.bc
~~~

### Self hosted web version

[Install node.js and npm](#node-package-only)

Install [bower](http://bower.io/) and [gulp](http://gulpjs.com/) globally:

~~~bash
#Fedora/CentOS
$ sudo npm install -g gulp bower

#OSX
$ npm install -g gulp bower
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

###Used libraries

The solution uses [jison](https://github.com/zaach/jison) - bison port to javascript - for generating parser and lexer from the `src/syntax.json` file.

The front end is built using [angular](http://angular.io) framework with [semantic-ui](http://semantic-ui.com) css modules and [code mirror](https://codemirror.net/) js code editor.

Cool, awesome and inspiring animated favicon is made with little help of [favico.js](http://lab.ejci.net/favico.js/).