FROM node:12.16.1
WORKDIR /usr/src/app
RUN npm install -g @angular/cli@7.3.9
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
