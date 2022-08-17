FROM node:14.17.3
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build
RUN npm install -g serve
CMD ["serve", "build"]