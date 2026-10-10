# Project01 — DevOps Delivery Lab

A Next.js app used to practise a repeatable software delivery path: quality gates, container builds, image scanning, GHCR publishing, optional SSH deployment, and runtime health monitoring.

## Stack

- Next.js 16, React 19, TypeScript
- GitHub Actions: lint, type-check, production build, health smoke test
- Docker multi-stage image and Docker Compose
- Trivy scan for high/critical OS and library vulnerabilities (unfixed issues ignored)
- GitHub Container Registry (GHCR) publishing after checks pass on `main` or version tags
- Prometheus + Blackbox Exporter + provisioned Grafana dashboard
- Manual SSH deployment workflow, gated by repository secrets

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app health endpoint is [http://localhost:3000/api/health](http://localhost:3000/api/health).

## Run with Docker

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:3000/api/health
docker compose logs -f web
docker compose down
```

The app container uses Next.js standalone output and runs as a non-root user.

## Local monitoring

Create a local `.env` file (it is ignored by Git) and set a strong Grafana password:

```dotenv
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=replace-with-a-strong-local-password
```

Start the application and the monitoring profile:

```bash
docker compose --profile monitoring up --build -d
```

Open:
- App: [http://localhost:3000](http://localhost:3000)
- Grafana: [http://localhost:3001](http://localhost:3001)
- Prometheus: [http://localhost:9090](http://localhost:9090)

The Grafana dashboard is provisioned automatically and shows endpoint success, HTTP status, and probe latency. Prometheus evaluates alert rules for failed health probes and slow responses. This starter setup records alert states in Prometheus; notifications need an Alertmanager receiver and delivery configuration.

The Prometheus and Grafana ports bind to loopback for local use. Do not expose them directly to the public internet. Stop the stack with:

```bash
docker compose --profile monitoring down
```

## CI and GHCR publishing

The workflow runs on pull requests to `main`, pushes to `main`, and version tags like `v1.0.0`.

For pull requests it runs app quality checks, starts the production app for an HTTP health smoke test, builds the Docker image, and fails the container job for high/critical vulnerabilities when Trivy can identify them. It ignores unfixed vulnerabilities.

For a push to `main`, after validation and scanning pass, the workflow publishes:
- `ghcr.io/utkdwivedi/project01:latest`
- `ghcr.io/utkdwivedi/project01:sha-<commit-sha>`

For a version tag such as `v1.0.0`, it publishes the version and SHA tags. GitHub Actions uses the repository-scoped `GITHUB_TOKEN`; no registry password is committed in code.

GHCR packages can be private by default. To pull the image from a server, either make the package public under GitHub Packages settings or configure a pull token as described below.

## Optional SSH deployment

Deployment is deliberately manual. It does not run on every push and will only work after a Linux host with Docker Engine and Docker Compose v2 is ready.

Configure these repository **Actions secrets**:
- `DEPLOY_HOST`: server hostname or IP
- `DEPLOY_USER`: SSH user allowed to run Docker
- `DEPLOY_SSH_KEY`: private key for that user (never commit it)
- `DEPLOY_KNOWN_HOSTS`: pre-verified SSH host-key entry for the server
- `DEPLOY_PATH`: absolute deployment directory, for example `/opt/project01`
- `DEPLOY_PORT`: optional SSH port; defaults to `22`
- `GHCR_USERNAME` and `GHCR_PULL_TOKEN`: optional credentials if the GHCR image is private; use a token with package read access

After the CI image is published, run **Actions → Deploy → Run workflow** and select `latest`, a `sha-<40-character-sha>` tag, or a version tag like `v1.0.0`. The workflow copies the deploy Compose file to the server, pulls the selected image, and recreates the service.

The deployment Compose file binds the web app to `127.0.0.1:3000` by default. Put it behind a reverse proxy with TLS before exposing it publicly. Ensure the remote user can use Docker without an interactive sudo prompt and that the host's firewall is configured.

## Security and operations notes

- Never store private keys, registry tokens, or real environment files in Git.
- The database `project_filebrowser.db` is currently tracked from the original repository and remains untouched. Inspect it for private/local data before removing it from version control.
- The monitoring UI ports are local-only by default.
- CI scan results are a useful gate, not proof that software is vulnerability-free.
- Add notification delivery (Alertmanager), backups, deployment rollback, and host-level monitoring before calling this production-ready.

## Existing material

The root-level tensor visuals and `webREdo_clean.txt` are retained for later review.
