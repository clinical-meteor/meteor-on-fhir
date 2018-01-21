#!/bin/sh
# replace ##_METEOR_SETTINGS_## with contents of settings.json and output to docker-compose.yml

# initialize the docker compose file
cp ../scripts/templates/docker-compose.template.yml ../docker-compose.yml

# read our our settings.docker.json file
# and then we have to clean it up and stringify it into a single line 
# because the METEOR_SETTINGS environment variable can't handle line breaks, tabs, spaces, etc.
meteorSettingsContent=$(cat ./configs/settings.docker.json |tr -d '\n' |tr -d '\t' | sed "s/: {/:{/g" | sed 's/,  *"/,"/g' | sed 's/:  *"/:"/g' | sed 's/:  */:/g');

# sometimes we want a bit of debugging
# echo $meteorSettingsContent;

# we're going to replace the ##METEOR_SETTINGS## placeholder 
# with the stringified data from the settings.docker.json file
replace-in-file "##_METEOR_SETTINGS_##" "$meteorSettingsContent" ../docker-compose.yml --verbose

# we can then do other neat things, like run docker-compose up



