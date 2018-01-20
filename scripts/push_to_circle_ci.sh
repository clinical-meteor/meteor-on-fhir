#!/bin/sh  

branch=$1
echo $branch

# remove symptomatic plugins
meteor remove symptomatic:blockchain-core
meteor remove symptomatic:landing-page
meteor remove symptomatic:videoconferencing
meteor remove symptomatic:vault-server
meteor remove symptomatic:continuity-of-care
meteor remove symptomatic:grid-layout
meteor remove symptomatic:static-pages
meteor remove symptomatic:routing-algorithms

# add default plugins
meteor add clinical:plugin-default-landing-page

git push origin $branch

# set things back to how they were by removing the default landing page
meteor remove clinical:plugin-default-landing-page

# and add our symptomatic plugins back in
meteor add symptomatic:blockchain-core
meteor add symptomatic:landing-page
