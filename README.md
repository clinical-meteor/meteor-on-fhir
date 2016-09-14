# Meteor on FHIR Forum
We decided to write a Wordpress/Discourse clone using Meteor and FHIR resources.  

[![CircleCI](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master)  


#### Installation

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir
cd meteor-on-fhir/webapp

#install dependencies
meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-toolbox react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box

# install the app
meteor npm install

# launch the app
meteor run

## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor
```


#### Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
## install test tools
meteor npm install -g nightwatch starrynight chromedriver phantomjs selenium-standalone-jar

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```
```

#### Mobile Build  

```sh
meteor run ios --mobile-server meteor-on-fhir.meteorapp.com
```    



#### Licensing

Abigail Watson
Artistic License 2.0

The code is free, but be careful about media assets, some of which are not publicly licensed.  
