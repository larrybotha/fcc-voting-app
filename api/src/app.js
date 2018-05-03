const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const app = express(feathers());

// Load app configuration
app
  .configure(configuration())
  // Enable CORS, security, compression, body parsing
  .use(cors())
  .use(helmet())
  .use(compress())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .configure(authentication)

  .configure(mongoose)

  // Set up Plugins and providers
  .configure(express.rest())
  .configure(socketio())

  // Configure other middleware (see `middleware/index.js`)
  .configure(middleware)
  // Set up our services (see `services/index.js`)
  .configure(services)
  // Set up event channels (see channels.js)
  .configure(channels)

  // Configure a middleware for 404s and the error handler
  .use(express.notFound())
  .use(express.errorHandler({logger}))

  .hooks(appHooks);

module.exports = app;
