# BUILD
FROM node:16 AS build
RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app
RUN npm install
RUN npm install ngx-gamepad --force
RUN npm install ngx-joystick@1.0.2 --force

COPY . /app
ENV TZ Asia/Seoul
RUN npm run build

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/angular-threejs-sample /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone



