FROM node:7.9.0-alpine

WORKDIR /
ADD README.md /
ADD package.json /
RUN npm install

ADD node_modules /node_modules
ADD index.js /

CMD [ "node", "index.js" ]