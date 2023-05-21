FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --force
COPY . ./
RUN npm run build
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html