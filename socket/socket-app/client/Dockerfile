FROM node:lts-alpine
WORKDIR /usr/chat-app/client
COPY . .
RUN npm run build
CMD [ "npx", "serve", "build" ]