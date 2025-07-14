# Etapa 1: Build de la app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Imagen base Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html