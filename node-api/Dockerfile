FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
