FROM node:18-alpine

WORKDIR /web

COPY . .

RUN yarn install

# RUN yarn build

# CMD ["yarn" "start"]

# CMD ["yarn", "dev"]

# EXPOSE 3001

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
