FROM node:18

WORKDIR /map-box
# Copy package.json and yarn.lock before other files to install exact dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD yarn build && npx serve -s build