FROM node:18-bullseye

# Install git, python for some npm builds
RUN apt-get update && apt-get install -y git python3 make g++

# Install Expo CLI globally (optional)
RUN npm install -g expo-cli

# Create workspace
WORKDIR /workspace
