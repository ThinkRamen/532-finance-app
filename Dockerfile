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

# DEVELOPMENT IMAGE
FROM base AS dev
COPY --from=prerelease /app .
EXPOSE 3000
CMD ["bun", "run", "dev"]