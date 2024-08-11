# 使用官方 Node.js 镜像作为基础镜像
FROM node:latest 
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN npm install
RUN npm install serve
RUN npm run build
EXPOSE 5000
CMD ["npx", "serve", "-s","dist","-p", "5000"]
