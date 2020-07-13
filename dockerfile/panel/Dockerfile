FROM ubuntu:16.04

WORKDIR /api

RUN apt-get update -y \
  && apt-get install -y curl \
  && apt-get install -y sudo \
  && apt-get install -y openssl \
  && apt-get install apt-transport-https ca-certificates curl software-properties-common -y \
  && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - \
  && add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable" \
  && apt-get update -y \
  && apt-get install docker-ce -y \
  && curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh \
  && bash nodesource_setup.sh \
  && apt-get install nodejs -y \
  && npm install yarn pm2 -g 

