# Lightweight Node 20 image
FROM node:20-alpine

# Work directory inside the container
WORKDIR /usr/src/app

# Install deps first (better Docker cache)
COPY package*.json ./
RUN npm ci

# Copy the rest of your project
COPY . .

# Your app listens on 3000 *inside* the container
EXPOSE 3000
