FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 3333

ENTRYPOINT ["node","ace","serve","--watch"]
