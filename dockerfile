FROM node:lts

WORKDIR /app

ENV PORT=3000
ENV DB_PASSWORD=P@ssw0rd

COPY package.json package-lock.json ./

RUN npm install

copy . .

RUN npm run build

CMD ["npm", "start:prod"]