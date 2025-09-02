FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5174
CMD ["npm","run","dev","--","--host","0.0.0.0"]
