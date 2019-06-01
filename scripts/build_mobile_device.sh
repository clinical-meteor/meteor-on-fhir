#!/bin/sh  

meteor add-platform ios

meteor add symptomatic:continuity-of-care symptomatic:geomapping symptomatic:theming symptomatic:smart-on-fhir-client symptomatic:smart-on-fhir-config symptomatic:landing-page

meteor run ios-device --mobile-server https://www.symptomatic.io --settings packages/landing-page/configs/tablet.symptomatic.io.json