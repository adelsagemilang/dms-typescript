#!/bin/bash

set -e pipefail

APP_URL="asia.gcr.io/logan-saas"
APP_NAME="dashboard-management-system-ui"
APP_VERSION="latest"
APP_DEFAULT_PORT=8080
APP_PORT_BIND=9494

TAG=$APP_URL/$APP_NAME:$APP_VERSION
UPDATE_CACHE=""

docker build -f deploy/Dockerfile -t $TAG .
docker create --name $APP_NAME $TAG

if [ -d node_modules ]
then
    mv package-lock.json old-package-lock.json
    docker cp $APP_NAME:/$APP_NAME/package-lock.json package-lock.json

    set +e pipefail
    UPDATE_CACHE=$(cmp package-lock.json old-package-lock.json)
    set -e pipefail
else
    UPDATE_CACHE=1
fi

if [ $UPDATE_CACHE -eq 1 ]
then
   docker cp $APP_NAME:/$APP_NAME/node_modules . 
fi

if [ "$(docker ps -aq -f name=$APP_NAME)" ]
then
   echo "remove container $APP_NAME"
   docker rm -f $APP_NAME
fi

docker run -t -p$APP_PORT_BIND:$APP_DEFAULT_PORT --name $APP_NAME -d $TAG
