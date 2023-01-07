FROM node:18
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]