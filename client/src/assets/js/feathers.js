import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const app = feathers();

app
  // all requests to feathers services should be done against this base URL
  .configure(rest('http://localhost:3030').fetch(window.fetch))
  // configure authentication with feathers using localStorag as the storage
  // strategy on the client
  .configure(
    auth({
      storage: window.localStorage,
    })
  );

export default app;
