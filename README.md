# Local-first Modular Monorepo

## Project Structure

The project is organized as a monorepo ([TurboRepo](https://turborepo.com/)) with the following main components:

- `apps/`
  - `api/`: Node.js API (Hono API; and Wrangler server)
  - As a micro-frontend:
    - `docs/`: [Next.js](https://nextjs.org) React (App Router) (no ElectricSQL)
    - `electric-next/`: [Next.js](https://nextjs.org) React (App Router) with a BFF (Next Api Router) and ElectricSQL
- `packages/`
  - `db-client/`: Database client (for Postgres). Database schema and migrations
  - `eslint-config/`: Shared EsLint configurations
  - `typescript-config/`: Shared TypeScript configurations
  - `ui`: Shared components, etc.

## Stack

- TypeScript
- CSS: Tailwind
- Database: Postgres DB
- ORM (Drizzle)
- PNPM

## System 

It is part of:
- [TurboRepo](https://turborepo.com/)
- Packages:
  - Database client (for Postgres)
  - Shared Eslint configs
  - Shared Typescript configs
  - Shared UI components library

## Commands

`pnpm add turbo --global`

`pnpm install --force` → sources, fetches, reinstalls secondary deps fresh
pnpm update (updates and sources all deps, incl. secondary)

`docker compose up` launches "electrified"-postgres

Alternatively, you can run the Electric sync service on its own and connect it to an existing Postgres database, e.g.:
```bash
docker run \
    -e "DATABASE_URL=postgresql://..." \
    -p 3000:3000 \
    -t \
    electricsql/electric:latest
```