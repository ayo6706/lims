# Use the official Node.js image with LTS tag
FROM node:21-alpine3.18

# Set working directory inside the container
WORKDIR /usr/src/app

# Install Prisma CLI globally
RUN npm install prisma -g

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Copy entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# Grant execute permission to the entrypoint script
RUN chmod +x /usr/src/app/entrypoint.sh


# Command to run your application
CMD ["/usr/src/app/entrypoint.sh"]
