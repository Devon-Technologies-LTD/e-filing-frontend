# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN npm install -g pnpm
RUN pnpm install

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
# COPY .env .env
RUN npm install -g pnpm
RUN pnpm build --no-lint

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S staff001
RUN adduser -S staff001 -u 1001

COPY --from=builder /app/public ./public
COPY ./app/favicon.png ./public

COPY --from=builder --chown=staff001:staff001 /app/.next/standalone ./
COPY --from=builder --chown=staff001:staff001 /app/.next/static ./.next/static

USER staff001

EXPOSE 9800

ENV PORT=9800

CMD HOSTNAME="0.0.0.0" node server.js
