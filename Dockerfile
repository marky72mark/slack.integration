FROM node:16

#Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --only=production

COPY . .

CMD ["node", "worker.js"]