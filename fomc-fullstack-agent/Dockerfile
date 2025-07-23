# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM python:3.11-slim

RUN pip install --no-cache-dir uv==0.6.12

WORKDIR /code

COPY ./pyproject.toml ./README.md ./uv.lock* ./

COPY ./app ./app

RUN uv sync --frozen

ARG COMMIT_SHA=""
ENV COMMIT_SHA=${COMMIT_SHA}

EXPOSE 8080

CMD ["uv", "run", "uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "8080"]


# # Use Python base image
# FROM python:3.11-slim

# # Install Node.js and npm
# RUN apt-get update && apt-get install -y nodejs npm curl \
#     && apt-get clean && rm -rf /var/lib/apt/lists/*

# # Install uv
# RUN pip install --no-cache-dir uv==0.6.12

# # Set working directory
# WORKDIR /code

# # Copy backend files
# COPY ./pyproject.toml ./README.md ./uv.lock* ./
# COPY ./app ./app

# # Copy frontend files
# COPY ./frontend ./frontend

# # Install backend and frontend dependencies
# RUN uv sync --frozen && npm --prefix frontend install

# # Expose frontend port
# EXPOSE 5173

# # Run backend and frontend in parallel
# CMD ["sh", "-c", "ALLOW_ORIGINS='*' uv run uvicorn app.server:app --host 0.0.0.0 --port 8000 & npm --prefix frontend run dev -- --host 0.0.0.0 --port 5173 & wait"]