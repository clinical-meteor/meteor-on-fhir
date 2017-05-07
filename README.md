# Meteor on FHIR
For my Masters of Science in Biomedical Informatics, we are required to create a Capstone Project.  So I decided to write a Health Information Exchange infrastructure.  The technical infrastructure uses MongoDB (a modern hierarchical database, similar to the MUMPS/Cache database what Epic uses), a full-stack isomorphic javascript framework called [Meteor](https://www.meteor.com/), and Facebook's user interface layer React.  The HIE uses a wordpress business model, and is intended to be a distributed and federated peer-to-peer network.  We use [HL7 Fast Healthcare Interoperability Resources (FHIR)](https://www.hl7.org/fhir/) for data exchange and interoperability.  

[![CircleCI](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/meteor-on-fhir/tree/master)  


![https://github.com/clinical-meteor/meteor-on-fhir/blob/master/media/screenshot-1.png](https://github.com/clinical-meteor/meteor-on-fhir/blob/master/media/screenshot-1.png)

Yes, the above is a live screenshot of the app, which supports a theming engine and an augmented reality interface.

#### A. Installation  

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir
cd meteor-on-fhir/webapp

# #install dependencies
# meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box

# install the app
meteor npm install
```


#### B. Running Local

```sh
## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor

## general development
NODE_ENV=test INITIALIZE=true Patients=true Practitioners=true meteor --settings settings.dev.json
```


#### C. Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
## install test tools
# meteor npm install nightwatch starrynight chromedriver phantomjs-prebuilt selenium-standalone-jar
meteor npm install

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```

#### D. Theme and Remove Licensed Media Assets
Edit the `settings.dev.json` file, and update:
```
{
  "public": {
    "title": "Rainbow's End Nursing Home Health Exchange",
    "theme": {
      "showVideoBackground": false
    }
  },
  "private": {
    "practitionerAccessCode": "hippocrates",
    "sysadminAccessCode": "rootaccess"
  }
}
```

Run the script to remove restricted media assets:
```
scripts/remove_restricted_media_assets.sh
```

#### E. Deploy to Production  

```sh
TIMEOUT_SCALE_FACTOR=10 DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy meteor-on-fhir.meteorapp.com --settings settings.dev.json
```   

#### F. Mobile Build   

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


#### G. Desktop Build   
To enable desktop builds, uncomment the following files in `.meteor/packages`.

- [ ] omega:meteor-desktop-watcher@=0.2.6
- [ ] omega:meteor-desktop-bundler@=0.2.6
- [ ] omega:meteor-desktop-localstorage@=0.0.11
- [ ] shell-server

For more info, see [https://www.npmjs.com/package/meteor-desktop](https://www.npmjs.com/package/meteor-desktop)

```sh
# add the .desktop directory, which has files needed by omega:meteor-desktop
npm run desktop -- init

# run the app locally, as if you were doing a mobile build
# (you may be able to just use the running mobile build server)
NODE_ENV=dev meteor --mobile-server http://localhost:3000 --settings settings.dev.json

# then run the desktop build
npm run desktop

# or try the shortcut script
 meteor npm run-script desktop
```    


### Interoperability References    
[Supporting Interoperability – Terminology, Subsets and Other Resources from Natl. Library of Medicine](https://www.nlm.nih.gov/hit_interoperability.html)  
[Health IT Standards for Health Information Management Practices](http://ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_WP_HITStdsforHIMPratices_Rev1.1_2015-09-18.pdf)  






