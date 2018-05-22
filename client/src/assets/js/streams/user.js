import xs from 'xstream';

import feathers from '../feathers';
import * as userActions from '../actions/user';

const initialUserState = {};

const userState$Creator = select =>
  xs
    .merge(
      xs
        .merge(
          select(userActions.LOGIN_SUCCESS),
          select(userActions.CREATE_USER_SUCCESS)
        )
        .map(action => state => state),
      xs
        .merge(
          select(userActions.LOGIN_FAILURE),
          select(userActions.CREATE_USER_FAILURE)
        )
        .map(action => state => state)
    )
    .startWith(() => initialUserState);

const loginRequestEffect = (select, dispatch) => {
  const $ = select(userActions.LOGIN_REQUEST)
    .map(({email, password}) =>
      xs
        .from(feathers.authenticate({strategy: 'local', email, password}))
        .replaceError(e => e)
    )
    .flatten();

  $.subscribe({
    next(res) {
      dispatch(loginSuccess(res));
    },
  });
};

const createUserEffect = (select, dispatch) => {
  const $ = select(userActions.CREATE_USER_REQUEST)
    .map(({email, password}) => {
      const usersService = feathers.service('users');

      return xs
        .from(usersService.create({email, password}))
        .replaceError(e => xs.of(e));
    })
    .flatten();

  $.addListener({
    next(res) {
      dispatch(userActions.createUserSuccess(res));
    },
  });
};

const userEffectsCreator = (select, dispatch) => {
  [loginRequestEffect, createUserEffect].map(effect =>
    effect(select, dispatch)
  );
};

export {userState$Creator, userEffectsCreator};
