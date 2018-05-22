import xs from 'xstream';

import feathers from '../feathers';
import * as userActions from '../actions/user';

const initialUserState = {};

const userState$Creator = action$ =>
  xs
    .merge(
      xs
        .merge(
          action$.filter(({type}) => userActions.LOGIN_SUCCESS),
          action$.filter(({type}) => userActions.CREATE_USER_SUCCESS)
        )
        .map(action => state => state),
      xs
        .merge(
          action$.filter(({type}) => userActions.LOGIN_FAILURE),
          action$.filter(({type}) => userActions.CREATE_USER_FAILURE)
        )
        .map(action => state => {
          return state;
        })
    )
    .startWith(() => initialUserState);

const loginRequestEffect = (action$, dispatch) => {
  const $ = action$
    .filter(({type}) => type === userActions.LOGIN_REQUEST)
    .map(({email, password}) =>
      xs.from(feathers.authenticate({strategy: 'local', email, password}))
    )
    .flatten();

  $.subscribe({
    next(res) {
      dispatch(loginSuccess(res));
    },
    error(res) {
      dispatch(loginFailure(res));
    },
  });
};

const createUserEffect = (action$, dispatch) => {
  const $ = action$
    .debug('createUserEffect')
    .filter(({type}) => type === userActions.CREATE_USER_REQUEST)
    .debug('createUserEffect after')
    .map(({email, password}) => {
      const usersService = feathers.service('users');

      return xs.from(usersService.create({email, password}));
    })
    .flatten()
    .map(e => {
      debugger;
      return e;
    });

  $.addListener({
    next(res) {
      dispatch(userActions.createUserSuccess(res));
    },
    error(res) {
      dispatch(userActions.createUserFailure(res));
    },
    complete() {
      console.log('completed');
    },
  });
};

const userEffectsCreator = (action$, dispatch) => {
  [loginRequestEffect, createUserEffect].map(effect =>
    effect(action$, dispatch)
  );
};

export {userState$Creator, userEffectsCreator};
