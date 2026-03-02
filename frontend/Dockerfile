# Use Node.js 20 Alpine for a small, fast image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Start the development server
# --host 0.0.0.0 is CRITICAL to allow your browser to access the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]