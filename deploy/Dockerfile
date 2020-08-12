### STAGE 1: Build ###
FROM node:12.16.1-alpine as build
LABEL app="Dashboard Management System" version="1.0"

COPY . ./dashboard-management-system-ui
WORKDIR /dashboard-management-system-ui

# Build of the application inside the container.
RUN apk --no-cache add python make g++
RUN yarn install
RUN yarn add --force node-sass
RUN yarn build

### STAGE 2: Production environment ###
FROM nginx:1.13.12-alpine

COPY --from=build /dashboard-management-system-ui/build /usr/share/nginx/html
COPY --from=build /dashboard-management-system-ui/deploy/app.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
