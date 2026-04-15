# Strapi CMS Dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++ vips-dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
RUN apk add --no-cache vips-dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache vips
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/favicon.png ./favicon.png
COPY --from=builder /app/data ./data
COPY --from=builder /app/scripts ./scripts

EXPOSE 1337
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
