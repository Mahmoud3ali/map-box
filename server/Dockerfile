FROM node:18

WORKDIR /server
# Copy package.json and yarn.lock before other files to install exact dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
# Run setup:db script to add two initial users
# Run dev script to start the server
CMD yarn setup:db && yarn dev