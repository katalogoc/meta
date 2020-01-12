FROM node:12.11.0-alpine AS builder
LABEL maintainer="shonie.starnikov@gmail.com"
# Default dir equals to /app (container)
WORKDIR /app
# Install this dependencies as they are missing in alpine distribution
RUN apk update && apk upgrade && \
    apk add --no-cache git
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json tsconfig.json ecosystem.config.js nodemon.json apollo.config.js /app/
ADD src/ /app/src
RUN npm i
RUN npm run build
# Remove src folder and devDependencies to decrease image size
RUN rm -rf src package-lock.json
RUN npm prune --production


FROM node:12.11.0-alpine
COPY --from=builder /app /app
WORKDIR /app
EXPOSE 8082
RUN npm install pm2 -g
CMD ["pm2-runtime", "npm", "--", "start"]
