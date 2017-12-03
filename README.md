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
NODE_ENV=test INITIALIZE=true Patients=true Practitioners=true meteor --settings configs/settings.dev.json
```


#### C. Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
cd meteor-on-fhir/webapp

## install test tools
git clone https://github.com/awatson1978/meteor-on-fhir-validation tests/nightwatch

## install test tools
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
      "backgroundImagePath": "/backgrounds/medical/Gradient.jpg",
      "backgroundColor": "#34B6C2",
      "palette": {
        "colorA": "#34B6C2",
        "colorB": "#177AB9",
        "colorC": "#31323C",
        "colorD": "#710A4A",
        "colorE": "#FFFFFF"
      }
    },
    "meshNetwork": {
      "upstreamSync": "http://meteor-on-fhir.meteorapp.com/fhir-3.0.0", 
      "autosync": false
    }    
  },
  "private": {
    "practitionerAccessCode": "practitionerAccessCode",
    "sysadminAccessCode": "sysadminAccessCode"
  },
  "galaxy.meteor.com": {
    "env": {
      "MONGO_URL": "mongodb://username:password@mlab.com:25389/my-org-exchange-db",
      "NODE_ENV": "produciton"
    }
  }  
}
```

Run the script to remove restricted media assets:
```
scripts/remove_restricted_media_assets.sh
```


#### E. Mobile Build   

```sh

# install meteor-desktop / electron
meteor npm install meteor-desktop

# development
# this can be tricky, because http://localhost:3000 may need to be a local IP address
# you may need to use `ifconfig` to find that address
# beware network isolation, and make sure your phone and workstation are on the same network
NODE_ENV=dev meteor run ios-device --mobile-server http://localhost:3000 --settings settings.dev.json

# production
# we need to specify the production server
NODE_ENV=dev meteor run ios-device --mobile-server http://meteor-on-fhir.meteorapp.com --settings configs/settings.galaxy.json
```    


#### F. Desktop Build   

```bash
 # build the executables and add them into the /public directory
meteor add-platform ios
meteor add omega:meteor-desktop-watcher@=0.11.1 omega:meteor-desktop-bundler@=0.11.1 omega:meteor-desktop-localstorage@=0.0.11
meteor npm install --save meteor-desktop

# add the .desktop directory, which has files needed by omega:meteor-desktop
npm run desktop -- init

# run the app server locally, as if you were doing a mobile build
# (you may be able to just use the running mobile build server)
NODE_ENV=dev meteor --mobile-server http://localhost:3000 --settings configs/settings.galaxy.json

# then to run the desktop app locally...
npm run desktop

# or try the shortcut script

meteor npm run-script desktop

# If you want to build a production release, that connects to the main server, you'll need to specify a different URL
meteor --mobile-server http://www.symptomatic.io --settings configs/settings.galaxy.json
npm run desktop -- build-installer http://www.symptomatic.io
```    


#### G. Deploy to Production  

```sh
# remove the desktop pipeline before building for Galaxy
meteor remove-platform ios
meteor remove omega:meteor-desktop-watcher omega:meteor-desktop-bundler omega:meteor-desktop-localstorage
meteor npm remove meteor-desktop
rm -rf node_modules
rm -rf .desktop-installer
meteor npm install

# upload to Galaxy
TIMEOUT_SCALE_FACTOR=10 DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com MONGO_URL=mongodb://<dbuser>:<dbpassword>@ds019638.mlab.com:19638/clinical-meteor meteor deploy --settings configs/settings.galaxy.json meteor-on-fhir.meteorapp.com
```   


#### H. Synchronizing With Other Datalakes  

To enable network synchronizing, you'll need to specify an upstream sync partner in your `settings.json` file.  Afterwards, you can enable manual synchronization in the **Data Management* page.  

```javascript
{
  "public": {
    "meshNetwork": {
      "upstreamSync": "http://meteor-on-fhir.meteorapp.com/fhir-3.0.0", 
      "autosync": false
    },
  }
}
```

#### I. Connect to an External EMR   
[HL7 v2 to FHIR Interface Mapping](https://medium.com/@awatson1978/hl7-v2-to-fhir-interface-mapping-f83c6ecf6bee)  

#### J. Dockerfile  
Docker containers are pretty exciting, and we now support containerization and container composition of the Meteor on FHIR architecture.

```sh
# build the docker image
cd webapp
docker build -t symptomatic/meteor-on-fhir .

# run the docker image; you'll need to set environment variables
# beware that each container has it's own localhost address; so 127.0.0.1 won't point to the same container
# you'll need to link containers and/or enable host or bridge networking
docker run -d -e METEOR_SETTINGS="$(cat configs/settings.dev.json)" -e MONG_URL=mongodb://111.222.333.444:27017/meteor -p 80:3000 symptomatic/meteor-on-fhir

# push the container to your infrastructure
docker push symptomatic/meteor-on-fhir

# or run the orchestration and monitor logs
docker-compose up
docker-compose logs

# and general maintenance and devops
docker images
docker ps
docker inspect
```

For more details on running Dockerized Meteor apps in production, see:
https://projectricochet.com/blog/production-meteor-and-node-using-docker-part-vi

### References

#### Miscellaneous Notes  
- CarePlans can be complicated.  At the current time, they're very much an advanced feature and don't ship completed and ready to use out of the box.  Expect to have to implement your own careplan.  It's best to turn the careplan module off in the settings.json file until you have the time to implement custom careplan logic.  



#### Miscellaneous References    
[Supporting Interoperability – Terminology, Subsets and Other Resources from Natl. Library of Medicine](https://www.nlm.nih.gov/hit_interoperability.html)  
[Health IT Standards for Health Information Management Practices](http://ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_WP_HITStdsforHIMPratices_Rev1.1_2015-09-18.pdf)  







#### Mapping  
[Snazzy Maps](https://snazzymaps.com/style/13/neutral-blue)  
[Google Maps Utility Library](https://code.google.com/archive/p/google-maps-utility-library-v3/wikis/Libraries.wiki)  
[Map Icons](http://map-icons.com/)  
[Styling Wizard](https://mapstyle.withgoogle.com/)  
[GoogleMapReact Documentation](https://github.com/istarkov/google-map-react)  
[GoogleMapReact API](https://github.com/istarkov/google-map-react/blob/master/API.md)  
[Google Transit Layer](https://developers.google.com/maps/documentation/javascript/examples/layer-transit)  
[Google Traffic Layer](https://developers.google.com/maps/documentation/javascript/examples/layer-traffic)  

