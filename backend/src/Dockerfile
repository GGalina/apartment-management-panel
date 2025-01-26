# Use the official Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Render will use
EXPOSE 8000

# Set the command to start your backend server
CMD ["npm", "start"]
