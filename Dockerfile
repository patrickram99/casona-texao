# Strapi CMS Dockerfile - uses pre-built dist/ from local build
FROM node:20-alpine

RUN apk add --no-cache python3 make g++ vips-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --omit=dev

COPY dist ./dist
COPY config/*.js ./config/

# Strapi v5 serves admin from node_modules path — copy build there
RUN mkdir -p /app/node_modules/@strapi/admin/dist/server/server/build && \
    cp -r /app/dist/build/* /app/node_modules/@strapi/admin/dist/server/server/build/
COPY src ./src
COPY public ./public
COPY data ./data
COPY blog_output ./blog_output
COPY scripts ./scripts
COPY favicon.png ./

EXPOSE 1337
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
