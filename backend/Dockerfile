# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system deps (for psycopg2 binary build on slim images if needed)
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code (Context is project root)
# We need 'backend', 'tools', and 'architecture'
COPY backend/ ./backend/
COPY tools/ ./tools/
COPY architecture/ ./architecture/

# Environment variable for python path
ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
