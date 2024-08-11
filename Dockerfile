FROM node:latest 

WORKDIR /app

COPY package.json ./
COPY . .


RUN npm install -g pnpm
RUN pnpm i
RUN npm install --global serve
RUN pnpm run build

EXPOSE 5000

CMD ["npx", "serve", "-s","dist","-p", "5000"]
