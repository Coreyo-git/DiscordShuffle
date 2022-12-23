FROM node:latest

# Create the bot's directory

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot

# copy package.json and install packages
COPY package.json /usr/src/bot

RUN npm install

COPY . /usr/src/bot

#init db
RUN node ./dbInit.js

# Start the bot.
CMD ["node", "index.js"]