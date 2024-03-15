# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
USER node
COPY . .
EXPOSE 3000
CMD npm run dev
