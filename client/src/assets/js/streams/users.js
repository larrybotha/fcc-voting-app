import xs from 'xstream';

import feathers from '../feathers';

let broadcastUserDetails;

const broadcast$ = xs.create({
  start(listener) {
    broadcastUserDetails = ({email, password}) => {
      listener.next({email, password});
    };
  },
  stop() {},
});

const createUser$ = broadcast$
  .map(user => {
    const service = feathers.service('users');

    return xstream.from(service.create(user));
  })
  .flatten();

const login$ = broadcast$.map(({email, password}) => {
  return xstreamfrom(
    feathers.authenticate({strategy: 'local', email, password})
  );
});

export {broadcastUserDetails, createUser$};
