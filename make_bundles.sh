#!/usr/bin/env bash

version_string=$(< VERSION)
rm -rf build/ firefox.zip chrome.zip # ensure we don't keep deleted files in our packages
mkdir -p build/
cp -R _locales icons src build/
cp manifest.ff.json build/manifest.json
cd build/
sed -i "s/VERSION_STRING/${version_string}/" manifest.json
zip -r ../firefox.zip *
cd ..
cp manifest.chrome.json build/manifest.json
cd build/
sed -i "s/VERSION_STRING/${version_string}/" manifest.json
zip -r ../chrome.zip * 
