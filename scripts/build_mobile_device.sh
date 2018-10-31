#!/bin/sh  

meteor add-platform ios

meteor run ios-device --mobile-server http://meteor-on-fhir.meteorapp.com --settings configs/settings.galaxy.json
