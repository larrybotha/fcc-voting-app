import xstream from 'xstream';

import feathers from '../feathers';

const createUser$ = ({email, password}) => {
  const service = feathers.service('users');

  return xstream.from(service.create({email, password}));
};

export {createUser$};
