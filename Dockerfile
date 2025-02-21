FROM node:18.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install pnpm -g
RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
