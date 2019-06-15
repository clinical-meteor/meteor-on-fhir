#!/bin/sh  

echo "Trying to add core packages needed for circle ci build."

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





recommendedCommand="meteor add --allow-incompatible-update";
needToAddPackages=false;

# remove service-request first?
a1=$(more .meteor/versions | grep 'clinical:default-landing-page' | wc -l)
if [ $a1 -eq 0 ]; 
    then echo "Removing clinical:default-landing-page";
         recommendedCommand="$recommendedCommand clinical:default-landing-page";
         needToAddPackages=true;
         # meteor add clinical:hl7-resource-service-request;
    else echo "Skipping..."; 
    fi; 


if [ "$needToAddPackages" = true ] ; then 
        echo "Try using the following command:"
        echo $recommendedCommand
        $recommendedCommand
    else 
        echo "Looks like no packages need to be removed."
    fi; 




