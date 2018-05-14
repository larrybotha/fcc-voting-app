import Rx from 'rxjs';

import {createActions} from './index';

const actionNames = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
};

const actions = createActions([
  actionNames.INCREMENT,
  actionNames.DECREMENT,
  actionNames.RESET,
]);

const initialState = 0;

const reducer$ = Rx.Observervable.of(() => initialState).merge(
  actions[actionNames.INCREMENT].map(payload => state => state + payload),
  actions[actionNames.DECREMENT].map(payload => state => state - payload),
  actions[actionNames.RESET].map(_ => _ => initialState)
);

export {actionNames, actions, reducer$};
