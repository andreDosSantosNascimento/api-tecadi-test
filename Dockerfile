FROM node:18

WORKDIR /usr/src

COPY . .
COPY package.json ./
COPY .env.production .env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]