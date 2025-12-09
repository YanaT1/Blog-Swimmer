FROM node:18-alpine
WORKDIR /back/app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "server.js"]
