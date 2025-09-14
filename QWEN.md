# Qwen Code Context

## Project Overview

This is a Next.js 15 application named "Social Media Empire" designed as a comprehensive social media management platform. It leverages a modern technology stack including TypeScript, Tailwind CSS, shadcn/ui components, Prisma ORM with SQLite, Socket.IO for real-time updates, and integrates with the `z-ai-web-dev-sdk` for AI capabilities.

The application provides features for:
- Analytics dashboards
- AI content generation
- Social platform integration
- Campaign management
- Competitor intelligence
- Predictive analytics
- Real-time updates via WebSockets

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management**: Zustand, TanStack Query
- **Forms**: React Hook Form, Zod
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Real-time Communication**: Socket.IO
- **AI Integration**: z-ai-web-dev-sdk
- **Other Libraries**: Framer Motion, Recharts, DND Kit, Date-fns, ReactUse

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
```

Key directories and files:
- `prisma/schema.prisma` - Database schema
- `src/lib/socket.ts` - Socket.IO setup and event handling
- `server.ts` - Custom Next.js server with Socket.IO integration
- `src/app/page.tsx` - Main dashboard page

## Building and Running

- **Development**: `npm run dev`
  - Uses `nodemon` to watch for file changes and restart the custom `server.ts`.
  - The development server runs on port 3000.
- **Build**: `npm run build`
- **Production Start**: `npm start`
- **Linting**: `npm run lint`
- **Database**:
  - Push schema changes: `npm run db:push`
  - Generate client: `npm run db:generate`
  - Run migrations: `npm run db:migrate`
  - Reset database: `npm run db:reset`

The development server log can be found at `dev.log`.

## Development Conventions

- Uses a custom Next.js server (`server.ts`) integrated with Socket.IO for real-time features.
- Prisma is configured for SQLite database operations.
- The application uses shadcn/ui components for a consistent UI.
- Real-time metrics and updates are handled through Socket.IO events defined in `src/lib/socket.ts`.
- AI capabilities are accessed through the `z-ai-web-dev-sdk`.
- Tailwind CSS is used for styling with a focus on responsive design.
- The main dashboard (`src/app/page.tsx`) is a tab-based interface for navigating different features.

## AI Integration

The project includes `z-ai-web-dev-sdk` for AI capabilities. Examples of usage are provided for:
- Chat completions
- Image generation
- Web search
- There's also a CLI tool (`z-ai-generate`) for image generation.

## Real-time Features

Socket.IO is configured for real-time communication with features for:
- User connections and authentication
- Platform-specific metric subscriptions
- Campaign and competitor updates
- Broadcasting analytics data