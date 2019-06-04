#!/bin/sh

cross-env NODE_ENV=testing  pm2 start server.js
mocha tests/*.test.js
pm2 kill