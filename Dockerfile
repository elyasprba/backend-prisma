# Choose the base image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy files to /app (working directory created before)
COPY . .

# Install appplication's dependencies
RUN npm install
# Install typescript dependency globally, for successfully build application (used by command below: "npm run build" === "tsc")
RUN npm install -g typescript

# Build application (check package.json)
RUN npm run build

# Expose the port
EXPOSE 8000

# Run the app
CMD ["npm", "run", "start:build"]