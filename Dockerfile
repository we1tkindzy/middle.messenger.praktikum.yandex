FROM node:14.17.6

WORKDIR /usr/src/my-app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
