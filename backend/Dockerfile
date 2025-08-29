# Use official Node.js image (Alpine for small size)
FROM node:22-alpine

# Install dependencies for building native packages
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    python3 \
    make

# Set environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory and copy package files
WORKDIR /opt/
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev

# Add node_modules/.bin to PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Copy the rest of the application
WORKDIR /opt/app
COPY . .

# Build the Strapi project
RUN npm run build

# Expose Strapi default port
EXPOSE 1337

# Start Strapi in production mode
CMD ["npm", "run", "start"]
