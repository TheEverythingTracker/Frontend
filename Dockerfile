# Build the app with node as builder
FROM node:20.7-bookworm-slim AS builder

WORKDIR /app

COPY . .

RUN yarn install && yarn build

# Serve the app wiht nginx
FROM nginx:1.25.2-bookworm

RUN useradd -u 8877 containeruser

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

USER containeruser

ENTRYPOINT ["nginx", "-g", "deamon off;"]
