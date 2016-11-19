# Meteor on FHIR Forum
We decided to write a Wordpress/Discourse clone using Meteor and FHIR resources.  

[![CircleCI](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master)  


#### A. Installation  

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir
cd meteor-on-fhir/webapp

# #install dependencies
# meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-toolbox react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box

# install the app
meteor npm install
```


#### B. Running Local

```sh
## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor

## general development
NODE_ENV=test INITIALIZE=true Patients=true Practitioners=true meteor --settings settings.dev.json

## general development
meteor npm run-script start
```


#### C. Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
## install test tools
meteor npm install nightwatch starrynight chromedriver phantomjs-prebuilt selenium-standalone-jar

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```

#### D. Deploy to Production  

```sh
TIMEOUT_SCALE_FACTOR=10 DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy meteor-on-fhir.meteorapp.com --settings settings.dev.json
```   


#### E. Mobile Build   

```sh
# development
# this can be tricky, because http://localhost:3000 may need to be a local IP address
# you may need to use `ifconfig` to find that address
# beware network isolation, and make sure your phone and workstation are on the same network
NODE_ENV=dev meteor run ios-device --mobile-server http://localhost:3000 --settings settings.dev.json

# production
# we need to specify the production server
NODE_ENV=dev meteor run ios-device --mobile-server http://meteor-on-fhir.meteorapp.com --settings settings.dev.json
```    

#### F. Publish to Testflight  

- [ ] Update version/build numbers
- [ ] Set Deployment Target to iOS v10.0
- [ ] Set Team Signing Certificate
- [ ] Build to local device
- [ ] Product > Clean
- [ ] Set Provision Profile
- [ ] Set Signing Profile
- [ ] Product > Archive > Validate
- [ ] Product > Archive > Upload to App Store



#### Licensing

Abigail Watson
Artistic License 2.0

The code is free, but be careful about media assets, some of which are not publicly licensed.  
