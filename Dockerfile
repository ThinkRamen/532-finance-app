FROM oven/bun:1 AS base
WORKDIR /app

# INSTALL DEPENDENCIES
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# COPY DEPENDENCIES AND SOURCE
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /node_modules
COPY . .

# BUILD AND SERVE
FROM base AS prod
COPY --from=prerelease /app .
RUN bun run build
FROM nginx:stable-alpine

COPY --from=prod /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
