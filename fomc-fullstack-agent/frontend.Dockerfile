FROM python:3.11-slim

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir uv==0.6.12

WORKDIR /code

# Copy backend files
COPY ./pyproject.toml ./README.md ./uv.lock* ./
COPY ./app ./app

# Copy frontend files
COPY ./frontend ./frontend

# Install dependencies
RUN uv sync --frozen && npm --prefix frontend install

EXPOSE 5173

# Start both backend and frontend in parallel
CMD ["sh", "-c", "ALLOW_ORIGINS='*' npm --prefix frontend run dev -- --host 0.0.0.0 & wait"]