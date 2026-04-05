# Strapi CMS Dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache python3 make g++ vips-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 1337

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
