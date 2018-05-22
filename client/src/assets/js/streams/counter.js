import xs from 'xstream';

import * as counterActions from '../actions/counter';

const initialCounterState = {count: 0};

const counterState$Creator = action$ =>
  xs
    .merge(
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
    )
    .startWith(() => initialCounterState);

const createLogEffect = (action$, dispatch) => {
  const $ = action$.filter(({type}) => type === counterActions.INCREMENT);

  $.addListener({
    next() {
      console.log('side effect');
    },
    error(e) {
      console.log(e);
    },
  });
};

const counterEffectsCreator = (action$, dispatch) => {
  const effects = [createLogEffect];

  effects.map(effect => effect(action$, dispatch));
};

export {counterState$Creator, counterEffectsCreator};
