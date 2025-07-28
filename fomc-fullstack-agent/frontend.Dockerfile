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

# frontend.Dockerfile

# ---- Stage 1: Build the React App ----
# FROM node:20-slim as builder

# WORKDIR /app
    
#     # Copy only the necessary files for installing dependencies
# COPY ./frontend/package.json ./frontend/package-lock.json ./
# RUN npm install
    
#     # Copy the rest of the frontend source code
# COPY ./frontend/ ./
    
#     # The .env file created by Cloud Build will be here!
#     # The VITE_BACKEND_URL will be read from it during the build.
# RUN npm run build
    
#     # ---- Stage 2: Serve with Nginx ----
# FROM nginx:1.27-alpine
    
#     # Copy the static files from the build stage
# COPY --from=builder /app/dist /usr/share/nginx/html
    
#     # Expose port 80 for Nginx
# EXPOSE 80
    
#     # The default Nginx command will start the server
# CMD ["nginx", "-g", "daemon off;"]