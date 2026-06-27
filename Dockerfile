FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run generate

FROM nginx:alpine
COPY --from=build /app/html /usr/share/nginx/html
