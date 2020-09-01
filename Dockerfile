FROM node:14.1.0-alpine3.10 

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf dist 

RUN yarn install

COPY . .

CMD ["yarn", "prod"]