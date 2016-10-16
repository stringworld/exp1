#!/usr/bin/env bash
# npm install -g gulp webpack
# npm i
gulp
mkdir -p /medishare/app/h5/ToG
cp ./dist/* /medishare/app/h5/ToG/
gulp clean