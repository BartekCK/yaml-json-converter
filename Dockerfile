FROM node:14.15.4-alpine

ENV APP_HOME /yaml-converter

WORKDIR $APP_HOME

COPY package.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src src/

RUN npm install --production
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
