FROM node:alpine
WORKDIR /app

COPY package-lock.json .
RUN npm ci
COPY . .

CMD ["npm", "run", "start"]
