FROM node:lts-alpine3.17

WORKDIR /app/frontend
COPY package.* .

RUN npm install
COPY . /app/frontend/

CMD ["npm","run","start"]