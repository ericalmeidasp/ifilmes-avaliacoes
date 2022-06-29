FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3333

ENTRYPOINT ["node","ace","serve","--watch"]
