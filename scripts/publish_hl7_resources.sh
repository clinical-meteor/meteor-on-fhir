#!/bin/sh  

commitMessage=$1
echo $commitMessage

for directory in `find . -type d -maxdepth 1 | grep 'hl7-resource'`
do

    echo "${directory}" 
    cd "${directory}" 

    git add --all .
    git commit -a -m $commitMessage

    git push origin master
    meteor publish

    cd ..
done







