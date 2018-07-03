#!/bin/sh

# assign arguments
settings=$1
echo $settings

url=$2
echo $url

# remove default plugins
meteor remove clinical:plugin-default-landing-page
meteor remove clinical:example-plugin

# remove symptomatic plugins
meteor add symptomatic:blockchain-core
meteor add symptomatic:landing-page
meteor add symptomatic:continuity-of-care

# publish version info
ver=$(git describe --abbrev=0 --tags)
complete=$(git describe --tags)
branch=$(git rev-parse --abbrev-ref HEAD)
commit=$(git rev-parse HEAD)
timestamp=$(git log -1 --date=short --pretty=format:%cd)
cat > private/version.json << EOF
{
    "basic": "$ver",
    "complete": "$complete",
    "branch": "$branch",
    "commit": "$commit",
    "timestamp": "$timestamp"
}
EOF

# push to production
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy --settings $settings $url