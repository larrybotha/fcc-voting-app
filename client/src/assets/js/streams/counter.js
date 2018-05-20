import xs from 'xstream';

import * as counterActions from '../actions/counter';

const initialCounterState = {count: 0};

const createCounter$ = action$ =>
  xs.merge(
    xs.of(() => initialCounterState),
    action$
      .filter(({type}) => type === counterActions.INCREMENT)
      .map(action => state => ({
        ...state,
        count: state.count + action.value,
      })),
    action$
      .filter(({type}) => type === counterActions.DECREMENT)
      .map(action => state => ({
        ...state,
        count: state.count - action.value,
      })),
    action$
      .filter(({type}) => type === counterActions.RESET)
      .map(_ => _ => initialCounterState)
  );

export default createCounter$;
