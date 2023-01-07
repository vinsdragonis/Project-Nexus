FROM node:18

# Create app directory
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD [ "nodemon", "index.js" ]
