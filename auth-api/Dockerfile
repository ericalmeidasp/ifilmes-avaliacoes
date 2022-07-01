FROM node:14-alpine

WORKDIR /home/node/app-auth

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["node","ace","serve","--watch"]
