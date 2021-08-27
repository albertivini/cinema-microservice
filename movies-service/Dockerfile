FROM node:latest
MAINTAINER Vinicius Alberti
COPY . /docker
WORKDIR /docker
RUN yarn
ENTRYPOINT ["node", "src/index.js"]
EXPOSE 3000