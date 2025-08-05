# Turborepo

## Project Structure

The project is organized as a monorepo with the following main components:

- `apps/`
  - `api/`: Hono API server
  - `ui1/`: Next.js frontend application
  - `ui2/`: Next.js frontend application
- `packages/`
  - `db-adapter/`: Database schema and migrations
  - `eslint-config/`: Shared EsLint configurations
  - `typescript-config/`: Shared TypeScript configurations
  - `ui`: Shared components, etc.

## Commands

`pnpm add turbo --global`