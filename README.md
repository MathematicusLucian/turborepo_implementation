# Turborepo

## Project Structure

The project is organized as a monorepo with the following main components:

- `apps/`
  - `api/`: Hono API server
  - `ui1/`: Next.js frontend application
  - `ui2/`: Next.js frontend application
- `packages/`
  - `db-client/`: Database schema and migrations
  - `eslint-config/`: Shared EsLint configurations
  - `typescript-config/`: Shared TypeScript configurations
  - `ui`: Shared components, etc.

## Commands

`pnpm add turbo --global`

`pnpm install --force` → sources, fetches, reinstalls secondary deps fresh
pnpm update (updates and sources all deps, incl. secondary)