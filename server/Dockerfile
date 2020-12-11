FROM node:12
EXPOSE 3000

# build frontend
WORKDIR /usr/src/app/site
COPY site/package*.json ./
RUN npm install
COPY ./site .
RUN npm run build

#build dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD [ "npm", "run", "start:prod" ]