FROM node:18-alpine

WORKDIR /app

COPY package.json . 

# Update npm and install dependencies with increased timeout and legacy peer deps
RUN npm install -g npm@latest && \
    npm config set timeout=60000 && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


