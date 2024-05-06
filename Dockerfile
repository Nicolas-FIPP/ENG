FROM --platform=linux/amd64 node:18-slim
RUN apt-get update && apt install -y openssl

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3344

CMD [ "yarn", "start" ]


