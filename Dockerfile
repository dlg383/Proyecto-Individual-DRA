FROM node:22-alpine3.18 as fbuilder
WORKDIR /app
RUN npm install -g @angular/cli
COPY . .
RUN npm install
RUN ng build

FROM nginx:1.25.5-alpine-slim
#Para que las rutas de angular funcionen en nginx:
COPY nginx.conf /etc/nginx/nginx.conf 
COPY --from=fbuilder /app/dist/frontend/* /usr/share/nginx/html/