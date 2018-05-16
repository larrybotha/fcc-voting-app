import xstream from 'xstream';

import feathers from '../feathers';

const auth$ = xstream.from(feathers.authenticate());

const createLogin$ = ({email, password}) =>
  xstream
    .from(feathers.authenticate({strategy: 'local', email, password}))
    .remember();

export {auth$, createLogin$};
