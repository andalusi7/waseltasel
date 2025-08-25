FROM node:22-alpine

# Install dependencies for building native packages
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

# Set environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set working directory and copy package files
WORKDIR /opt/
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install --omit=dev

# Add node_modules/.bin to PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Copy the rest of the application
WORKDIR /opt/app
COPY . .

# Set correct permissions and switch to non-root user
RUN chown -R node:node /opt/app
USER node

# Build and run
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]
