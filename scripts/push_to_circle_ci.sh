#!/bin/sh  

branch=$1
echo $branch

echo "Removing proprietary packages before pushing to the continuous integration environment.";

# detect packages
a1=$(meteor remove symptomatic:blockchain-core)
echo $a1

a2=$(meteor remove symptomatic:continuity-of-care)
echo $a2

a3=$(meteor remove symptomatic:landing-page)
echo $a3

a4=$(meteor remove symptomatic:grid-layout)
echo $a4

a6=$(meteor remove symptomatic:routing-algorithms)
echo $a6

a7=$(meteor remove symptomatic:static-pages)
echo $a7

a8=$(meteor remove symptomatic:theming)
echo $a8

a9=$(meteor remove symptomatic:videoconferencing)
echo $a9

a10=$(meteor remove symptomatic:vault-server)
echo $a10

a11=$(meteor remove symptomatic:smart-on-fhir-client)
echo $a11

a12=$(meteor remove clinical:plugin-default-landing-page)
echo $a12

git push origin $branch

