# Use a lighter version of Node as a parent image
FROM node:16-slim
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /data
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
 
# Copies everything over to Docker environment
COPY . .

# Finally runs the application
CMD [ "npm", "start" ]