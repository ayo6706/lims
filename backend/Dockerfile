# Use an official Node.js image with a specific version as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY lims/backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY lims/backend .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
