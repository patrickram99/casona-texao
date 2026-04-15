# Strapi CMS Dockerfile - uses pre-built dist/ from local build
FROM node:20-alpine

RUN apk add --no-cache python3 make g++ vips-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --omit=dev

# Only copy dist/ (compiled JS) — NOT config/ or src/ (TypeScript source)
COPY dist ./dist
COPY public ./public
COPY data ./data
COPY scripts ./scripts
COPY favicon.png ./

EXPOSE 1337
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
