FROM node:18

# Create app directory
WORKDIR /usr/src/app
#kk

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD [ "nodemon", "index.js" ]