#  Next.js Multi-Stage Docker Deployment with CI/CD

A production-ready example demonstrating how to containerize a **Next.js** application using a **multi-stage Docker build**. This approach creates a lightweight runtime image by separating the build process from the final production environment. It also includes a **CI/CD** workflow setup using **GitHub Actions** under `.github/workflows`.

---

##  Features

- ✅ Multi-stage Docker build
- ✅ Optimized production image
- ✅ Standalone Next.js deployment
- ✅ Configurable application port
- ✅ Minimal runtime dependencies
- ✅ Easy to build and run
- ✅ CI/CD workflow with GitHub Actions

---

##  Project Structure

```text
.
├── .github/
│   └── workflows/
├── docker/
│   └── Dockerfile.frontend
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

---

##  CI/CD with GitHub Actions

This project is set up for automated **CI/CD** using workflow files in the `.github/workflows` directory. These workflows can help build, test, and deploy the Dockerized Next.js application automatically.

---

##  Prerequisites

Before getting started, ensure you have:

- Docker installed
- Docker Engine running

Verify your installation:

```bash
docker --version
docker info
```

---

#  Build the Docker Image

Run the following command from the project root:

```bash
docker build \
  -t next_frontend_multistage \
  -f docker/Dockerfile.frontend \
  frontend
```

### Explanation

| Option | Description |
|---------|-------------|
| `-t` | Tags the image as `next_frontend_multistage` |
| `-f` | Specifies the Dockerfile location |
| `frontend` | Build context |

---

#  Run the Container

Start the application using:

```bash
docker run -d \
  -e PORT=3030 \
  -p 3030:3030 \
  --name next_frontend_container \
  next_frontend_multistage
```

### Command Breakdown

| Flag | Purpose |
|------|---------|
| `-d` | Run container in detached mode |
| `-e PORT=3030` | Sets the application port |
| `-p 3030:3030` | Maps host port to container port |
| `--name` | Assigns a container name |

---

#  Access the Application

Once the container starts successfully, open:

```text
http://localhost:3030
```

---

#  Docker Management Commands

## View Running Containers

```bash
docker ps
```

---

## View All Containers

```bash
docker ps -a
```

---

## Stop the Container

```bash
docker stop next_frontend_container
```

---

## Start the Container Again

```bash
docker start next_frontend_container
```

---

## Restart the Container

```bash
docker restart next_frontend_container
```

---

## View Container Logs

```bash
docker logs next_frontend_container
```

Follow live logs:

```bash
docker logs -f next_frontend_container
```

---

## Remove the Container

```bash
docker rm next_frontend_container
```

Force remove:

```bash
docker rm -f next_frontend_container
```

---

## Remove the Docker Image

```bash
docker rmi next_frontend_multistage
```

---

# Docker Workflow

```text
Next.js Source Code
        │
        ▼
docker build
        │
        ▼
Multi-Stage Build
        │
        ├── Builder Stage
        │      • Install dependencies
        │      • Build Next.js app
        │
        ▼
Runtime Stage
        │
        • Copy standalone build
        • Copy static assets
        • Start production server
        │
        ▼
docker run
        │
        ▼
Application Available
http://localhost:3030
```

---

# Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port on which the application runs | `3000` |

Example:

```bash
docker run -d \
-e PORT=4000 \
-p 4000:4000 \
next_frontend_multistage
```

---

#  Why Multi-Stage Builds?

Using a multi-stage Docker build provides several advantages:

- Smaller final image size
- Faster deployments
- Reduced attack surface
- Cleaner production image
- Build dependencies are excluded from the runtime image
- Better cache utilization during builds

---

#  Cleanup

Remove unused Docker resources:

```bash
docker system prune
```

Remove everything including unused images and volumes:

```bash
docker system prune -a --volumes
```

---

# Notes

- The application listens on the port specified by the `PORT` environment variable.
- Ensure the host and container ports match when publishing ports.
- The production image contains only the files required to run the Next.js application.
- This setup is ideal for production deployments and CI/CD pipelines.

---

## Example

```bash
# Build
docker build -t next_frontend_multistage -f docker/Dockerfile.frontend frontend

# Run
docker run -d \
-e PORT=3030 \
-p 3030:3030 \
--name next_frontend_container \
next_frontend_multistage

# Open
http://localhost:3030
```

---

## License

This project is intended for learning and demonstration purposes.