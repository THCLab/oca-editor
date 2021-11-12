FROM node:16 as builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM alpine as production
WORKDIR /app
COPY --from=builder /app/dist ./dist
