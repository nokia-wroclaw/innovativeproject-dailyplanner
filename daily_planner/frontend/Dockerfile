FROM node:16 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

ARG REACT_APP_API_URL=https://daily-planner-demo-api.herokuapp.com/api/users/

RUN npm run build

FROM nginx:mainline-alpine

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["/bin/sh", "-c", "sed -i \"s/listen  .*/listen $PORT;/g\" /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

