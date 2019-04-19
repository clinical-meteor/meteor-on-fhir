#!/bin/sh

# originally found at https://github.com/jchristman/meteor-publish-tool
usage="./version-tool.sh [(-M | --major) (-m | --minor)] (package name(s))\n\nBy default, this will bump each version by a patch number unless -m or -M is specified."
major=false
minor=false
packages=()

while [ "$1" != "" ]; do
    case $1 in
        -M | --major )          major=true
                                ;;
        -m | --minor )          minor=true
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     packages+=($1)
                                ;;
    esac
    shift
done

if [[ $major == true || $minor == true ]]; then
    patch=false
else
    patch=true
fi;

function semverParseInto() {
    local RE='[^0-9]*\([0-9]*\)[.]\([0-9]*\)[.]\([0-9]*\)\([0-9A-Za-z-]*\)'
    #MAJOR
    eval $2=`echo $1 | sed -e "s#$RE#\1#"`
    #MINOR
    eval $3=`echo $1 | sed -e "s#$RE#\2#"`
    #MINOR
    eval $4=`echo $1 | sed -e "s#$RE#\3#"`
    #SPECIAL
    eval $5=`echo $1 | sed -e "s#$RE#\4#"`
}

cwd=`pwd`
for pkg in ${packages[*]}
do
    cd $pkg
    pkgPath=`pwd`

    version=$(grep "version:" package.js | grep -o '[0-9]*\([0-9]*\)[.]\([0-9]*\)[.]\([0-9]*\)\([0-9A-Za-z-]*\)')
    printf "\tCurrent Version: $version\n"

    semverParseInto "$version" MAJOR MINOR PATCH SPECIAL

    if $major; then
        MAJOR=$((MAJOR + 1));
        MINOR="0";
        PATCH="0";
    elif $minor; then
        MINOR=$((MINOR + 1));
        PATCH="0";
    elif $patch; then
        PATCH=$((PATCH + 1));
    fi

    version="$MAJOR.$MINOR.$PATCH$SPECIAL";
    printf "\tNew Version: $version\n"
    
    sed -i.bak "s/`grep "version:" package.js`/    version: '$version',/g" package.js
    
    cd $cwd
done