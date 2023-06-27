#!/bin/sh
set -e

yarn build

yarn start -H 0.0.0.0 -p 3001
