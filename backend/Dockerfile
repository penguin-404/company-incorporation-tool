# 1. Use an official Node.js runtime as the base image
# Alpine is a lightweight Linux distribution
FROM node:20-alpine

# 2. Set the working directory inside the container
# All subsequent commands will run inside this folder
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first
# This is a trick: Docker caches this layer. If you don't change 
# dependencies, Docker won't re-run 'npm install' every time you change code.
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install

# 5. Copy the rest of your backend source code into the container
COPY . .

# 6. Expose the port your Express server listens on
EXPOSE 5000

# 7. Define the command to run your app
# Using 'npm run dev' so it works with nodemon for your development
CMD ["npm", "run", "dev"]