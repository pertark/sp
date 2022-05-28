FROM node:gallium-alpine

WORKDIR /sp

COPY package*.json ./
RUN yarn install

COPY ./ ./
RUN yarn build

CMD ["yarn", "serve"]
