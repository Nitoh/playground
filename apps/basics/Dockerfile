# Stage 1: Build
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine AS production-stage
# Kopiere unsere eigene Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Kopiere das Build-Ergebnis
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]