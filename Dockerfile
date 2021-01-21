FROM node:12

WORKDIR /app

COPY package*.json ./app/

RUN npm install

RUN npm i -g nodemon

COPY /src ./app/

CMD ["npm", "start"]