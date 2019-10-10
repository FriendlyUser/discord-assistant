#!/bin/bash

# good old bash to .env files
echo "NODE_ENV=$NODE_ENV" >> .env
if [ "$1" == "" ]; then
    echo "MONGO_URI=$TEST_MONGO_DB" >> .env
fi
if [ "$1" != "" ]; then
    echo "Positional parameter 1 contains something"
    echo "DISCORD_TOKEN=$DISCORD_TOKEN" >> .env
    echo "MONGO_URI=$DEV_MONGO_DB" >> .env
    echo "WEATHER_APP_ID=$WEATHER_APP_ID"
fi