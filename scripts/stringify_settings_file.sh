#!/bin/sh

settingsFile=$1
echo $settingsFile

cat $settingsFile |tr -d '\n' |tr -d '\t' | sed "s/: {/:{/g" | sed 's/,  *"/,"/g' | sed 's/:  *"/:"/g' | sed 's/:  */:/g'