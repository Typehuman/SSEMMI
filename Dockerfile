FROM node:12

# Create app dir
WORKDIR /usr/src/orcasound-api

# Install app dependencies
COPY package*.json ./

RUN npm i
