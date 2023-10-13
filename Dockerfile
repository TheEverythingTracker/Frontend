# Build the app with node as builder
FROM node:20.7-bookworm-slim AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

# Serve the app with nginx
FROM nginx:1.25.2-bookworm

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
