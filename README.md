# Project01 — Delivery Foundation

A small Next.js application used to practise a repeatable delivery workflow: local development, automated quality checks, a containerized runtime, and a health endpoint.

> This repository is being rebuilt from an incomplete/mixed project state. Existing tensor visuals and research notes are intentionally retained while the app and delivery tooling are restored.

## Stack

- Next.js 16, React 19, TypeScript
- ESLint and TypeScript checks
- Docker multi-stage build, running as a non-root user
- Docker Compose with an HTTP-based container health check
- GitHub Actions CI on pushes and pull requests to `main`

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify the app

```bash
npm run lint
npm run typecheck
npm run build
```

The health endpoint is available at [http://localhost:3000/api/health](http://localhost:3000/api/health). It returns JSON with a service identifier, health status, and timestamp.

## Run with Docker

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:3000/api/health
docker compose logs -f web
docker compose down
```

The container uses Next.js standalone output, exposes port 3000, and runs as an unprivileged user. Compose marks the service healthy only when the health endpoint returns a successful response.

## Delivery workflow

GitHub Actions runs `npm ci`, linting, type checking, and a production build. A green CI run means these checks passed in the runner; it does not by itself mean the application has been deployed.

## Next steps

- Add a deployment target and environment-specific configuration.
- Add runtime monitoring/metrics and alerting once a hosting target is chosen.
- Review the tracked local database and old research files before deciding whether any should be moved or removed.
- Add a smoke test that starts the production container and verifies its HTTP health endpoint.

## Existing material

The root-level tensor images and `webREdo_clean.txt` are preserved for later review. The file `project_filebrowser.db` is also left untouched in this bootstrap; inspect it before deciding whether it belongs in version control.
