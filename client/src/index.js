const app = require('./app');

const PORT = 3000;
const server = app.listen(PORT);

server.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promuise ', p, reason)
);

server.on('listening', () =>
  console.log(`Express started on localhost:${PORT}`)
);
