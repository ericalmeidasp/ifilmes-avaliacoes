FROM node:14-alpine

WORKDIR /home/node/app-auth

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node","ace","serve","--watch"]
