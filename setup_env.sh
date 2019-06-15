#!/bin/bash

# good old bash to .env files
echo "NODE_ENV=$NODE_ENV" >> .env
echo "MONGO_URI=$TEST_MONGO_DB" >> .env

if [ "$1" != "" ]; then
    echo "Positional parameter 1 contains something"
    echo "DISCORD_TOKEN=$DISCORD_TOKEN" >> .env
fi