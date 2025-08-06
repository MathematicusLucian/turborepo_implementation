# ElectricNext

This is:
- Node.js API (Hono API; and Wrangler server)
- TypeScript
- CSS: Tailwind 
- Database: Postgres DB
- ORM (Drizzle)

It is part of:
- [Turborepo](https://turborepo.com/)
- UI Apps as a micro-frontend:
  - `docs/`: [Next.js](https://nextjs.org) React (App Router) (no ElectricSQL)
  - `electric-next/`: [Next.js](https://nextjs.org) React (App Router) with a BFF (Next Api Router) and ElectricSQL
- Packages:
  - Database client (for Postgres)
  - Shared Eslint configs
  - Shared Typescript configs
  - Shared UI components library
  
## Getting Started

First, run the development server:

```bash
pnpm install --filter=api --dir apps/api # from the root
pnpm dev
open (in the browser) http://localhost:3000
```
 