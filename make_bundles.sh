#!/usr/bin/env bash

mkdir -p build/
cp -R _locales icons src build/
cp manifest.ff.json build/manifest.json
cd build/
zip -r ../firefox.zip *
cd ..
cp manifest.chrome.json build/manifest.json
cd build/
zip -r ../chrome.zip * 
