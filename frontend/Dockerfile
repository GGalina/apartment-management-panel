# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:1.23.3

# Copy the built React files to the Nginx static files directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
