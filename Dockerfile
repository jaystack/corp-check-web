FROM node:latest

WORKDIR /app

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install

ADD components /app/components
ADD pages /app/pages
ADD static /app/static
ADD api.js /app/api.js

RUN npm run build

CMD [ "npm", "start" ]