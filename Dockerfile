# base image
FROM node:16.6.1-alpine3.13 as build
# set working directory
WORKDIR /app
EXPOSE 3000
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json package-lock.json ./
#COPY package.json /app/package.json
RUN npm install --silent && npm install react-scripts@3.3.0 -g --silent
# add app
COPY . ./
# start and/or build app
RUN npm run build

FROM nginx:latest
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm /etc/nginx/conf.d/default.conf
# Copies static resources from builder stage
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]