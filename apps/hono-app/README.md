## Getting Started

First, run the development server:

```
pnpm install --filter=api --dir apps/api # from the root
pnpm dev
```

```
open http://localhost:3000
```

```
{
  "name": "api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts --port 3003",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {
    "@repo/db": "workspace:*",
    "@hono/node-server": "^1.13.1",
    "@hono/zod-validator": "^0.3.0",
    "hono": "^4.6.3"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/eslint": "catalog:",
    "@types/node": "^20.11.17",
    "@types/pg": "^8.11.10",
    "autoprefixer": "^10",
    "eslint": "catalog:",
    "tsx": "^4.7.1",
    "typescript": "catalog:"
  }
}
```{
  "extends": "@repo/typescript-config/node.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "jsxImportSource": "hono/jsx",
    "composite": true,
    "incremental": true
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}


{
  "name": "api",
  "version": "1.0.0",
  "type": "module",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "tsx watch src/index.ts --port 3003",
    "build": "tsc",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {
    "@repo/db": "workspace:*",
    "@hono/node-server": "^1.13.1",
    "@hono/zod-validator": "^0.3.0",
    "hono": "^4.6.3"
  },
  "devDependencies": {
    "@types/node": "^20.11.17",
    "@types/pg": "^8.11.10",
    "autoprefixer": "^10",
    "tsx": "^4.7.1",
    "typescript": "^5.4.0"
  }
}