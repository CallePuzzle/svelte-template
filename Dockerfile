FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:22-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && apt-get clean
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
