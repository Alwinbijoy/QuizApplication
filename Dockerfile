# Use official Node.js image as base
FROM node:14-alpine as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code to container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the frontend app
CMD ["npm", "start"]
