FROM node:alpine
WORKDIR /usr/app
COPY . .
RUN yarn && yarn add typescript tsc ts-node && yarn build
CMD ["node", "./dist/server.js"]