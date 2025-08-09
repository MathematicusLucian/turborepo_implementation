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

## Package.json
```bash
"scripts": {
  "dev": "turbo run dev"
}
```
Start command example (set env vars for all apps):
```bash
APPS=shell,index,app-two PORTS=3000,3001,3002 \
SHELL_PORT=3000 INDEX_PORT=3001 APP_TWO_PORT=3002 \
docker-compose up
```

## Helm workflow
Single source of truth requires external templating/generation → avoids manual repeats. External templating = preprocess YAML before Docker uses it. Helm renders Helm templates into standard Docker Compose YAML (static config), as opposed to `docker-compose up`, which runs containers from generated YAML. Helm supports loops, conditionals, variables (Docker Compose/YAML syntax itself → no native loops or control structures.)

Write `values.yaml` with services list and ports
```bash
# values.yaml (list of services)
services:
  - name: shell
    port: 3000
  - name: index
    port: 3001
  - name: app-two
    port: 3002
```

Write Helm templates with range loop over services
```bash
# docker-compose.yaml (Helm template with loop)
version: '3'
services:
{{- range .Values.services }}
  {{ .name }}:
    image: your-image
    ports:
      - "{{ .port }}:{{ .port }}"
    environment:
      - PORT={{ .port }}
{{- end }}
```

No direct `docker-compose up` on Helm chart. Helm generates the YAML first.
- Run `helm template ./chart -f values.yaml > docker-compose.yaml (render manifests)`
- Run `docker-compose -f docker-compose.yaml up`

Run with `./start.sh` → short, simple
```bash
# Use a shell script or alias to wrap commands → shorten call
#!/bin/sh
helm template ./chart -f values.yaml > docker-compose.yaml && docker-compose -f docker-compose.yaml up
```

Or shell alias:
```bash
alias hc='helm template ./chart -f values.yaml > docker-compose.yaml && docker-compose -f docker-compose.yaml up'
```

## /apps/index, /apps/app-two, /apps/app-three, /apps/app-four

* All MF remote bundles expose globals (window.ui_header, window.ui_navbar) via remoteEntry.js
* mf-bootstrap.js loads remoteEntry files once per browser session → shared runtime across all apps in same tab
* loadRemote() initializes container and returns module factory → client-only render of components
* single-spa parcels exposed by remotes allow shell to mount/unmount components outside App Router lifecycle
* Avoid importing MF remotes in server code; keep remote usage in client ('use client') components only

* Each app uses same pattern: inject /mf-bootstrap.js in layout and loadRemote() to render Header/Navbar client-side.
* Example /apps/index/app/page.tsx:

tsx
// apps/index/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { loadRemote } from 'mf-utils/loadRemote';

export default function Page() {
  const [HeaderComp, setHeaderComp] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const mod = await loadRemote('ui_header/Header');
      if (!mounted) return;
      setHeaderComp(() => mod.default ?? mod);
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <main>
      <div id="slot-header">{HeaderComp && <HeaderComp title="Index Header" onAction={()=>alert('hi')} />}</div>
      <p>Index app content</p>
    </main>
  );
}

Layout for each app:

tsx
// apps/index/app/layout.tsx  (same for app-two/app-three/app-four)
export default function RootLayout({ children }: any) {
  return (
    <html>
      <head><script src="/mf-bootstrap.js" defer></script></head>
      <body>{children}</body>
    </html>
  );
}