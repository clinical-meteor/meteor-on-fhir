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
#     lineCount=$(more .meteor/packages | grep $packageName | wc -l);
#     # echo $lineCount;
#     if [ $lineCount -gt 0 ]; 
#     then echo "Removing" $packageName; 
#          # meteor remove $packageName; 
#     else echo "Skipping..."; 
#     fi; 

# done

# echo "=========================================================="

# detect packages
a1=$(more .meteor/packages | grep 'symptomatic:blockchain-core' | wc -l)
if [ $a1 -gt 0 ]; 
    then echo "Removing symptomatic:blockchain-core"; 
         meteor remove symptomatic:blockchain-core;
    else echo "Skipping..."; 
    fi; 

a2=$(more .meteor/packages | grep 'symptomatic:continuity-of-care' | wc -l)
if [ $a2 -gt 0 ]; 
    then echo "Removing symptomatic:continuity-of-care"; 
         meteor remove symptomatic:continuity-of-care;
    else echo "Skipping..."; 
    fi; 

a3=$(more .meteor/packages | grep 'symptomatic:landing-page' | wc -l)
if [ $a3 -gt 0 ]; 
    then echo "Removing symptomatic:landing-page"; 
         meteor remove symptomatic:landing-page;
    else echo "Skipping..."; 
    fi; 

a4=$(more .meteor/packages | grep 'symptomatic:grid-layout' | wc -l)
if [ $a4 -gt 0 ]; 
    then echo "Removing symptomatic:grid-layout"; 
         meteor remove symptomatic:grid-layout;
    else echo "Skipping..."; 
    fi; 

a5=$(more .meteor/packages | grep 'symptomatic:routing-algorithms' | wc -l)
if [ $a5 -gt 0 ]; 
    then echo "Removing symptomatic:routing-algorithms"; 
         meteor remove symptomatic:routing-algorithms;
    else echo "Skipping..."; 
    fi; 

a6=$(more .meteor/packages | grep 'symptomatic:static-pages' | wc -l)
if [ $a6 -gt 0 ]; 
    then echo "Removing symptomatic:static-pages"; 
         meteor remove symptomatic:static-pages;
    else echo "Skipping..."; 
    fi; 

a7=$(more .meteor/packages | grep 'symptomatic:theming' | wc -l)
if [ $a7 -gt 0 ]; 
    then echo "Removing symptomatic:theming"; 
         meteor remove symptomatic:theming;
    else echo "Skipping..."; 
    fi; 

a8=$(more .meteor/packages | grep 'symptomatic:videoconferencing' | wc -l)
if [ $a8 -gt 0 ]; 
    then echo "Removing symptomatic:videoconferencing"; 
         meteor remove symptomatic:videoconferencing;
    else echo "Skipping..."; 
    fi; 

a9=$(more .meteor/packages | grep 'symptomatic:vault-server' | wc -l)
if [ $a9 -gt 0 ]; 
    then echo "Removing symptomatic:vault-server"; 
         meteor remove symptomatic:vault-server;
    else echo "Skipping..."; 
    fi; 

a10=$(more .meteor/packages | grep 'symptomatic:smart-on-fhir-client' | wc -l)
if [ $a10 -gt 0 ]; 
    then echo "Removing symptomatic:smart-on-fhir-client"; 
         meteor remove symptomatic:smart-on-fhir-client;
    else echo "Skipping..."; 
    fi; 

a11=$(more .meteor/packages | grep 'clinical:plugin-default-landing-page' | wc -l)
if [ $a11 -gt 0 ]; 
    then echo "Removing clinical:plugin-default-landing-page"; 
         meteor remove symptomatic:plugin-default-landing-page;
    else echo "Skipping..."; 
    fi; 

a12=$(more .meteor/packages | grep 'symptomatic:smart-on-fhir-config' | wc -l)
if [ $a12 -gt 0 ]; 
    then echo "Removing symptomatic:smart-on-fhir-config"; 
         meteor remove symptomatic:smart-on-fhir-config;
    else echo "Skipping..."; 
    fi; 

a13=$(more .meteor/packages | grep 'symptomatic:geomapping' | wc -l)
if [ $a13 -gt 0 ]; 
    then echo "Removing symptomatic:geomapping"; 
         meteor remove symptomatic:geomapping;
    else echo "Skipping..."; 
    fi; 

a14=$(more .meteor/packages | grep 'symptomatic:ihealth-cloud-api' | wc -l)
if [ $a14 -gt 0 ]; 
    then echo "Removing symptomatic:ihealth-cloud-api"; 
         meteor remove symptomatic:ihealth-cloud-api;
    else echo "Skipping..."; 
    fi; 


