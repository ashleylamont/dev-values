# syntax=docker/dockerfile:1

FROM oven/bun:1.2-slim

WORKDIR /app

# 1) install all deps
COPY bun.lock package.json tsconfig.json* ./
RUN bun install --frozen-lockfile

# 3) copy source and build everything
COPY . .
RUN bunx vite build --mode=production

# 4) run the server
EXPOSE 3000
CMD ["bun", "server.ts"]
