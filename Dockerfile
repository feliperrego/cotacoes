FROM node:alpine

ENV HOME=/home/app

COPY . $HOME/code

WORKDIR $HOME/code
RUN npm install

EXPOSE 3001
CMD [ "npm", "start"]