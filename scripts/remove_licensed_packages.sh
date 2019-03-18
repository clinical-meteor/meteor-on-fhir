#!/bin/sh  

echo "Trying to remove licensed packages and other intellectual property that shouldn't be distributed in the open source build."

# Caution:  Brackets need spaces around them for if/then to work.

# I think the following works, but Circle CI apparently doesn't support arrays in their bash implementation 

# declare -a packages
# packages=( 
#     "symptomatic:blockchain-core" 
#     "symptomatic:continuity-of-care" 
#     "symptomatic:landing-page" 
#     "symptomatic:grid-layout" 
#     "symptomatic:routing-algorithms"
#     "symptomatic:static-pagess"
#     "symptomatic:theming"
#     "symptomatic:videoconferencing"
#     "symptomatic:vault-server"
#     "symptomatic:smart-on-fhir-client"
#     "symptomatic:plugin-default-landing-page"
#     "symptomatic:smart-on-fhir-config"
#     "symptomatic:geomapping"
#     "symptomatic:ihealth-cloud-api"
#     )

# echo "=========================================================="
# for packageName in "${packages[@]}"
# do
#     # echo $packageName;
#     lineCount=$(more .meteor/versions | grep $packageName | wc -l);
#     # echo $lineCount;
#     if [ $lineCount -gt 0 ]; 
#     then echo "Removing" $packageName; 
#          # meteor remove $packageName; 
#     else echo "Skipping..."; 
#     fi; 

# done

# echo "=========================================================="

recommendedCommand="meteor remove";

# remove service-request first?
a15=$(more .meteor/versions | grep 'clinical:hl7-resource-service-request' | wc -l)
if [ $a15 -gt 0 ]; 
    then echo "Removing clinical:hl7-resource-service-request";
         recommendedCommand="$recommendedCommand clinical:hl7-resource-service-request";
         # meteor remove clinical:hl7-resource-service-request;
    else echo "Skipping..."; 
    fi; 

# detect packages
a1=$(more .meteor/versions | grep 'symptomatic:blockchain-core' | wc -l)
if [ $a1 -gt 0 ]; 
    then echo "Removing symptomatic:blockchain-core"; 
         recommendedCommand="$recommendedCommand symptomatic:blockchain-core";
         # meteor remove symptomatic:blockchain-core;
    else echo "Skipping..."; 
    fi; 

a2=$(more .meteor/versions | grep 'symptomatic:continuity-of-care' | wc -l)
if [ $a2 -gt 0 ]; 
    then echo "Removing symptomatic:continuity-of-care"; 
         recommendedCommand="$recommendedCommand symptomatic:continuity-of-care";
         # meteor remove symptomatic:continuity-of-care;
    else echo "Skipping..."; 
    fi; 

a3=$(more .meteor/versions | grep 'symptomatic:landing-page' | wc -l)
if [ $a3 -gt 0 ]; 
    then echo "Removing symptomatic:landing-page"; 
         recommendedCommand="$recommendedCommand symptomatic:landing-page";
         # meteor remove symptomatic:landing-page;
    else echo "Skipping..."; 
    fi; 

a4=$(more .meteor/versions | grep 'symptomatic:grid-layout' | wc -l)
if [ $a4 -gt 0 ]; 
    then echo "Removing symptomatic:grid-layout"; 
         recommendedCommand="$recommendedCommand symptomatic:grid-layout";
         # meteor remove symptomatic:grid-layout;
    else echo "Skipping..."; 
    fi; 

a5=$(more .meteor/versions | grep 'symptomatic:routing-algorithms' | wc -l)
if [ $a5 -gt 0 ]; 
    then echo "Removing symptomatic:routing-algorithms"; 
         recommendedCommand="$recommendedCommand symptomatic:routing-algorithms";
         # meteor remove symptomatic:routing-algorithms;
    else echo "Skipping..."; 
    fi; 

a6=$(more .meteor/versions | grep 'symptomatic:static-pages' | wc -l)
if [ $a6 -gt 0 ]; 
    then echo "Removing symptomatic:static-pages"; 
         recommendedCommand="$recommendedCommand symptomatic:static-pages";
         # meteor remove symptomatic:static-pages;
    else echo "Skipping..."; 
    fi; 

a7=$(more .meteor/versions | grep 'symptomatic:theming' | wc -l)
if [ $a7 -gt 0 ]; 
    then echo "Removing symptomatic:theming"; 
         recommendedCommand="$recommendedCommand symptomatic:theming";
         # meteor remove symptomatic:theming;
    else echo "Skipping..."; 
    fi; 

a8=$(more .meteor/versions | grep 'symptomatic:videoconferencing' | wc -l)
if [ $a8 -gt 0 ]; 
    then echo "Removing symptomatic:videoconferencing"; 
         recommendedCommand="$recommendedCommand symptomatic:videoconferencing";
         # meteor remove symptomatic:videoconferencing;
    else echo "Skipping..."; 
    fi; 

a9=$(more .meteor/versions | grep 'symptomatic:vault-server' | wc -l)
if [ $a9 -gt 0 ]; 
    then echo "Removing symptomatic:vault-server"; 
         recommendedCommand="$recommendedCommand symptomatic:vault-server";
         # meteor remove symptomatic:vault-server;
    else echo "Skipping..."; 
    fi; 

a10=$(more .meteor/versions | grep 'symptomatic:smart-on-fhir-client' | wc -l)
if [ $a10 -gt 0 ]; 
    then echo "Removing symptomatic:smart-on-fhir-client"; 
         recommendedCommand="$recommendedCommand symptomatic:smart-on-fhir-client";
         # meteor remove symptomatic:smart-on-fhir-client;
    else echo "Skipping..."; 
    fi; 

a11=$(more .meteor/versions | grep 'clinical:plugin-default-landing-page' | wc -l)
if [ $a11 -gt 0 ]; 
    then echo "Removing clinical:plugin-default-landing-page"; 
         recommendedCommand="$recommendedCommand clinical:plugin-default-landing-page";
         # meteor remove symptomatic:plugin-default-landing-page;
    else echo "Skipping..."; 
    fi; 

a12=$(more .meteor/versions | grep 'symptomatic:smart-on-fhir-config' | wc -l)
if [ $a12 -gt 0 ]; 
    then echo "Removing symptomatic:smart-on-fhir-config"; 
         recommendedCommand="$recommendedCommand symptomatic:smart-on-fhir-config";
         # meteor remove symptomatic:smart-on-fhir-config;
    else echo "Skipping..."; 
    fi; 

a13=$(more .meteor/versions | grep 'symptomatic:geomapping' | wc -l)
if [ $a13 -gt 0 ]; 
    then echo "Removing symptomatic:geomapping"; 
         recommendedCommand="$recommendedCommand symptomatic:geomapping";
         # meteor remove symptomatic:geomapping;
    else echo "Skipping..."; 
    fi; 

a14=$(more .meteor/versions | grep 'symptomatic:ihealth-cloud-api' | wc -l)
if [ $a14 -gt 0 ]; 
    then echo "Removing symptomatic:ihealth-cloud-api"; 
         recommendedCommand="$recommendedCommand symptomatic:ihealth-cloud-api"
         # meteor remove symptomatic:ihealth-cloud-api;
    else echo "Skipping..."; 
    fi; 


z1=$(more .meteor/versions | grep 'biologio:curebot' | wc -l)
if [ $z1 -gt 0 ]; 
    then echo "Removing biologio:curebot"; 
         recommendedCommand="$recommendedCommand biologio:curebot"
         # meteor remove symptomatic:ihealth-cloud-api;
    else echo "Skipping..."; 
    fi; 

echo "Try using the following command:"
echo $recommendedCommand
$recommendedCommand


