FROM node:20

WORKDIR /app/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD [ "node", "index.js" ]