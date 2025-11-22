# ==============================================================================
# Multi-Stage Dockerfile for ModelForge Next.js Application
# ==============================================================================
# This Dockerfile demonstrates:
# - Multi-stage builds for optimization
# - Dependency caching
# - Security best practices
# - Production-ready optimization
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Dependencies Installation
# ------------------------------------------------------------------------------
FROM node:20-alpine AS deps

# Install security updates and required packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies with clean install for reproducible builds
RUN npm ci --only=production && \
    npm cache clean --force

# ------------------------------------------------------------------------------
# Stage 2: Development Dependencies & Build
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 3: Testing (Optional - run with --target test)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS test

WORKDIR /app

# Copy all dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install dev dependencies for testing
RUN npm ci

# Run tests (customize based on your test setup)
# RUN npm run test
# RUN npm run lint
# RUN npm run type-check

# ------------------------------------------------------------------------------
# Stage 4: Production Runtime
# ------------------------------------------------------------------------------
FROM node:20-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
