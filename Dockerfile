FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm i -g nodemon
RUN npm i bcrypt@5.0.0

COPY src /app/src/

CMD ["npm", "start"]