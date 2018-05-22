import xs from 'xstream';

import * as counterActions from '../actions/counter';

const initialCounterState = {count: 0};

const counterState$Creator = select =>
  xs
    .merge(
      select(counterActions.INCREMENT).map(action => state => ({
        ...state,
        count: state.count + action.value,
      })),
      select(counterActions.DECREMENT).map(action => state => ({
        ...state,
        count: state.count - action.value,
      })),
      select(counterActions.RESET).map(_ => _ => initialCounterState)
    )
    .startWith(() => initialCounterState);

const createLogEffect = (select, dispatch) => {
  const $ = select(counterActions.INCREMENT);

  $.addListener({
    next() {
      console.log('side effect');
    },
    error(e) {
      console.log(e);
    },
  });
};

const counterEffectsCreator = (select, dispatch) => {
  const effects = [createLogEffect];

  effects.map(effect => effect(select, dispatch));
};

export {counterState$Creator, counterEffectsCreator};
