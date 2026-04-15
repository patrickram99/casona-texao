# SvelteKit Frontend Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=builder --chown=app:app /app/build ./build
COPY --from=builder --chown=app:app /app/package.json ./
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
USER app

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "build"]
