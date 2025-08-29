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
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=true

# Add node_modules/.bin to PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Copy the rest of the application
WORKDIR /opt/app
COPY . .

# Build the Strapi project
RUN yarn build

# Expose Strapi default port (but Azure will override with WEBSITES_PORT/PORT)
EXPOSE 8080

# Start Strapi in production mode
CMD ["yarn", "start"]
