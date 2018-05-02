# referencing:
# https://github.com/BretFisher/node-docker-good-defaults/blob/master/Dockerfile
# https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4
# use node 9.5.0
FROM node:9.5.0

# create the directory in the container where we will run our app from
RUN mkdir -p /usr/app

# set node environment
# we can override this environment variable from docker-compose.yml
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# set default to port 3030
ARG PORT=3030
ENV PORT $PORT
# expose app port, and debug port
EXPOSE $PORT 9229

# check every 30s to ensure this service returns HTTP 200
# HEALTHCHECK CMD curl -fs http://localhost:$PORT/healthz || exit 1

# set current working directory for following commands
WORKDIR /usr
# copy package.json from the host system to WORKDIR
# when new deps are installed, we need to rebuild using:
# $ docker build .
# use * to match both package.json and package-lock.json
COPY package*.json ./
# install deps
RUN npm install && npm cache clean --force
ENV PATH /usr/node_modules/.bin:$PATH

# copy everything from the host to the container
WORKDIR /usr/app
COPY . /usr/app

# don't use npm to start the app... just use node
CMD ["node", "index.js"]
