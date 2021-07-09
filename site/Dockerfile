FROM node:12 as build

WORKDIR /site
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/public /usr/share/nginx/html