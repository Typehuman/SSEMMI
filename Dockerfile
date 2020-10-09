FROM node:12

# Create app dir
WORKDIR /usr/src/ssemmi-api

# Install app dependencies
COPY ["package*.json", "./"]

RUN npm i && npm i -g nodemon

COPY [".", "./"]

EXPOSE 9000

CMD [ "npm", "run", "dev" ]
