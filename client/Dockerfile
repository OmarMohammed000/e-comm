FROM node:17-alpine AS builder

WORKDIR /client-app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.19.0


WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /client-app/build .


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
