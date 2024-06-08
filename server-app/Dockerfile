FROM node:20-alpine3.16
WORKDIR /usr/src/app
COPY . .

RUN npm ci

CMD ["node", "src/index.js"]
