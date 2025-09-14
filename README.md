# Social Media Empire

A comprehensive social media management platform built with Next.js 15, TypeScript, and modern web technologies.

## Features

- **Analytics Dashboard**: Real-time performance metrics across all social platforms
- **AI Content Studio**: Generate optimized content for different platforms using AI
- **Social Platform Integration**: Manage multiple social media accounts from one place
- **Campaign Management**: Create and track marketing campaigns
- **Competitor Intelligence**: Monitor competitor performance and market trends
- **Predictive Analytics**: AI-powered insights for future performance
- **Campaign Automation**: Automate social media posting and engagement
- **Real-time Communication**: Socket.IO powered real-time updates

## Technology Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React Icons
- **State Management**: Zustand, TanStack Query
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Real-time**: Socket.IO
- **AI Integration**: z-ai-web-dev-sdk
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run db:push
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run db:push`: Push the Prisma schema to the database
- `npm run db:generate`: Generate Prisma client
- `npm run db:migrate`: Run database migrations
- `npm run db:reset`: Reset the database

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/            # API routes
│   └── page.tsx        # Main dashboard page
├── components/         # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── prisma/             # Prisma schema and database configuration
```

## Key Components

1. **AnalyticsDashboard**: Comprehensive analytics with charts and metrics
2. **AIContentStudio**: AI-powered content generation for social platforms
3. **SocialPlatformIntegration**: Manage social media accounts
4. **CampaignManagement**: Create and track marketing campaigns
5. **CompetitorIntelligence**: Monitor competitors and market trends
6. **PredictiveAnalytics**: AI-powered predictive insights
7. **CampaignAutomation**: Automate social media activities

## Real-time Features

The application uses Socket.IO for real-time communication:
- Live analytics updates
- Instant notifications
- Real-time collaboration features

## API Endpoints

- `/api/ai-content`: Generate AI content for social media
- `/api/health`: Health check endpoint
- `/api/db-test`: Database connection test
- `/api/socketio`: Socket.IO connection endpoint

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="file:./db/custom.db"
```

## Development

The application uses a custom server (`server.ts`) with Socket.IO integration for real-time features. The development server automatically restarts when changes are detected.

## Testing

Run the comprehensive system test from the dashboard to verify all components are working correctly:
1. Database connection
2. API routes
3. AI content generation
4. Real-time communication
5. Analytics dashboard

## Deployment

Build the application for production:

```bash
npm run build
npm start
```

The application can be deployed to any platform that supports Node.js applications.