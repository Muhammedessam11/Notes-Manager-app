FROM node:20-alpine

WORKDIR /app

COPY package.json . 

# Update npm to the latest version and install dependencies
RUN npm install -g npm@latest && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]



