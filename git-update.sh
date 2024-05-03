#!/bin/bash

git add .
git commit -m "$1"
git push -u origin main
git pull origin main
