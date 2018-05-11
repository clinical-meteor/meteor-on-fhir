#!/bin/sh

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