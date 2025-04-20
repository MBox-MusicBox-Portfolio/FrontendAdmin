FROM node:20-alpine
WORKDIR /usr/src/app/admin-public
COPY . ./
EXPOSE 5173
RUN ["npm","install"]