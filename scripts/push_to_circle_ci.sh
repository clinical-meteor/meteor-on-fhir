#!/bin/sh  

branch=$1
echo $branch

# remove symptomatic plugins
meteor remove symptomatic:blockchain-core
meteor remove symptomatic:continuity-of-care
meteor remove symptomatic:landing-page
meteor remove symptomatic:grid-layout
meteor remove symptomatic:routing-algorithms
meteor remove symptomatic:static-pages
meteor remove symptomatic:theming
meteor remove symptomatic:videoconferencing
meteor remove symptomatic:vault-server

# add default plugins
meteor remove symptomtic:smart-on-fhir-client
meteor add clinical:plugin-default-landing-page

git push origin $branch

