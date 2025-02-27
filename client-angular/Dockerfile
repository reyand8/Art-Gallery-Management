FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install


EXPOSE 4200

COPY . .

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
