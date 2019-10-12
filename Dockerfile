FROM "node:12.11.0"
LABEL maintainer="shonie.starnikov@gmail.com"

# Default dir equals to /app (container)
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json tsconfig.json ecosystem.config.js nodemon.json apollo.config.js /app/
ADD src/ /app/src
RUN npm i
RUN npm run build

# Remove src folder and devDependencies to decrease image size
RUN rm -rf src
RUN npm prune --production

EXPOSE 8082

# Start container with scheduling the import jobs and starting the node server
CMD ["sh", "-c", "npm start"]