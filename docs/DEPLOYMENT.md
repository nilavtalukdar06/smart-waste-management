# Deployment Guide

This guide covers deploying Eco Swachh to various platforms and environments.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git
- MongoDB database
- Required API keys and services

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smart-waste-management.git
   cd smart-waste-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your production credentials
   ```

4. **Build the application**

   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## 🌐 Platform-Specific Deployment

### Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments, edge functions, and global CDN.

#### 1. Connect to Vercel

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

#### 2. Environment Variables

Set the following environment variables in Vercel dashboard:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Pusher
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

# Email
RESEND_API_KEY=your_resend_api_key

# File Upload
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

#### 3. Custom Domain

1. **Add custom domain in Vercel dashboard**
2. **Update DNS records**
3. **Update NEXTAUTH_URL environment variable**

#### 4. Automatic Deployments

Connect your GitHub repository to Vercel for automatic deployments:

1. **Go to Vercel dashboard**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure build settings**
5. **Deploy**

### Netlify

#### 1. Build Configuration

Create `netlify.toml` in the root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy

1. **Connect to Netlify**
2. **Set build command**: `npm run build`
3. **Set publish directory**: `.next`
4. **Configure environment variables**

### Railway

#### 1. Railway Configuration

Create `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### 2. Deploy

1. **Install Railway CLI**

   ```bash
   npm i -g @railway/cli
   ```

2. **Login and deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

### Docker Deployment

#### 1. Dockerfile

Create `Dockerfile`:

```dockerfile
# Use the official Node.js runtime as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 2. Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - GOOGLE_AI_API_KEY=${GOOGLE_AI_API_KEY}
      - PUSHER_APP_ID=${PUSHER_APP_ID}
      - PUSHER_KEY=${PUSHER_KEY}
      - PUSHER_SECRET=${PUSHER_SECRET}
      - PUSHER_CLUSTER=${PUSHER_CLUSTER}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - UPLOADTHING_SECRET=${UPLOADTHING_SECRET}
      - UPLOADTHING_APP_ID=${UPLOADTHING_APP_ID}
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

#### 3. Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### AWS Deployment

#### 1. EC2 Instance

1. **Launch EC2 instance**
2. **Install Node.js and PM2**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

3. **Clone and deploy**
   ```bash
   git clone https://github.com/yourusername/smart-waste-management.git
   cd smart-waste-management
   npm install
   npm run build
   pm2 start npm --name "eco-swachh" -- start
   pm2 startup
   pm2 save
   ```

#### 2. AWS Lambda (Serverless)

Create `serverless.yml`:

```yaml
service: eco-swachh

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    MONGODB_URI: ${env:MONGODB_URI}
    NEXTAUTH_SECRET: ${env:NEXTAUTH_SECRET}
    NEXTAUTH_URL: ${env:NEXTAUTH_URL}
    GOOGLE_AI_API_KEY: ${env:GOOGLE_AI_API_KEY}
    PUSHER_APP_ID: ${env:PUSHER_APP_ID}
    PUSHER_KEY: ${env:PUSHER_KEY}
    PUSHER_SECRET: ${env:PUSHER_SECRET}
    PUSHER_CLUSTER: ${env:PUSHER_CLUSTER}
    RESEND_API_KEY: ${env:RESEND_API_KEY}
    UPLOADTHING_SECRET: ${env:UPLOADTHING_SECRET}
    UPLOADTHING_APP_ID: ${env:UPLOADTHING_APP_ID}

functions:
  app:
    handler: server.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
```

### Google Cloud Platform

#### 1. App Engine

Create `app.yaml`:

```yaml
runtime: nodejs18

env_variables:
  NODE_ENV: "production"
  MONGODB_URI: "your_mongodb_connection_string"
  NEXTAUTH_SECRET: "your_nextauth_secret"
  NEXTAUTH_URL: "https://your-app-id.appspot.com"
  GOOGLE_AI_API_KEY: "your_google_ai_api_key"
  PUSHER_APP_ID: "your_pusher_app_id"
  PUSHER_KEY: "your_pusher_key"
  PUSHER_SECRET: "your_pusher_secret"
  PUSHER_CLUSTER: "your_pusher_cluster"
  RESEND_API_KEY: "your_resend_api_key"
  UPLOADTHING_SECRET: "your_uploadthing_secret"
  UPLOADTHING_APP_ID: "your_uploadthing_app_id"

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 10

resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10
```

#### 2. Deploy to App Engine

```bash
# Install Google Cloud SDK
gcloud auth login
gcloud config set project your-project-id
gcloud app deploy
```

## 🔧 Production Configuration

### Environment Variables

Ensure all production environment variables are set:

```bash
# Required for production
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
MONGODB_URI=your_production_mongodb_uri
NEXTAUTH_SECRET=your_secure_nextauth_secret

# AI Services
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Real-time Services
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

# Email Services
RESEND_API_KEY=your_resend_api_key

# File Upload
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### Security Headers

Add security headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
```

### Performance Optimization

1. **Enable compression**
2. **Configure caching**
3. **Optimize images**
4. **Enable CDN**

### Monitoring and Logging

#### 1. Application Monitoring

```bash
# Install monitoring tools
npm install @sentry/nextjs
npm install @vercel/analytics
```

#### 2. Health Check Endpoint

Create `app/api/health/route.ts`:

```typescript
import { NextResponse } from "next/server";
import connectToMongoDb from "@/db";

export async function GET() {
  try {
    await connectToMongoDb();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: error.message },
      { status: 500 }
    );
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
          GOOGLE_AI_API_KEY: ${{ secrets.GOOGLE_AI_API_KEY }}
          PUSHER_APP_ID: ${{ secrets.PUSHER_APP_ID }}
          PUSHER_KEY: ${{ secrets.PUSHER_KEY }}
          PUSHER_SECRET: ${{ secrets.PUSHER_SECRET }}
          PUSHER_CLUSTER: ${{ secrets.PUSHER_CLUSTER }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          UPLOADTHING_SECRET: ${{ secrets.UPLOADTHING_SECRET }}
          UPLOADTHING_APP_ID: ${{ secrets.UPLOADTHING_APP_ID }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
  only:
    - main

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - curl -X POST $DEPLOY_WEBHOOK_URL
  only:
    - main
```

## 📊 Performance Monitoring

### Vercel Analytics

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Sentry Error Tracking

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

## 🔒 Security Checklist

- [ ] Environment variables are secure
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Authentication is properly configured
- [ ] Database connections are secure
- [ ] File uploads are validated
- [ ] CORS is properly configured
- [ ] Dependencies are up to date

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install
   npm run build
   ```

2. **Environment Variables**

   ```bash
   # Verify environment variables
   npm run env:check
   ```

3. **Database Connection**

   ```bash
   # Test database connection
   npm run db:test
   ```

4. **Performance Issues**
   ```bash
   # Analyze bundle size
   npm run analyze
   ```

### Support

For deployment issues:

- **Documentation**: [Deployment Wiki](https://github.com/yourusername/smart-waste-management/wiki/deployment)
- **Issues**: [GitHub Issues](https://github.com/yourusername/smart-waste-management/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/smart-waste-management/discussions)
- **Email**: deployment@ecoswachh.com

---

**Note**: Always test deployments in a staging environment before deploying to production.
