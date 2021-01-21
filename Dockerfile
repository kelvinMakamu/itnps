FROM node:12

RUN mkdir /app
WORKDIR /app

# Copy specific module versions
COPY package*.json /app/

# Install packages
RUN npm install

# Install dev dependency
RUN npm i -g nodemon
# Install stale module
RUN npm i bcrypt@5.0.0

COPY src /app/src/

# Start app
CMD ["npm", "start"]