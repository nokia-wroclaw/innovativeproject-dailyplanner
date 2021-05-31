FROM node:16 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:mainline-alpine

COPY --from=builder /app/build /usr/share/nginx/html

