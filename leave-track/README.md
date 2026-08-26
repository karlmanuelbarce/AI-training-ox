# LeaveTrack

Employee leave management system built with Next.js 16 and Supabase Postgres.

## Features

- Submit leave requests
- View leave balances
- Manager approval queue
- HR audit reports
- Mobile-responsive design

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Database:** Supabase Postgres
- **Auth:** Mock sessions (Day 0), real provider (Day 1)
- **Deployment:** Vercel, Supabase

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/leave-track.git
cd leave-track

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Format code
npm run format
```

### Database

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## Project Structure

```
leave-track/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth pages (login)
│   ├── (dashboard)/        # Dashboard pages
│   └── api/                # API routes
├── components/             # React components
│   ├── features/           # Feature-specific components
│   ├── layout/             # Layout components
│   └── ui/                 # UI primitives
├── lib/                    # Utility functions
├── types/                  # TypeScript types
└── prisma/                 # Database schema
```

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run linting and type checking
4. Submit a pull request

## License

MIT
