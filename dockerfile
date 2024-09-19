FROM node:lts as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts as production

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --only=production

EXPOSE 3001

CMD ["npm", "start:prod"]