import xs from 'xstream';

function createState(reducer$) {
  const state$ = reducer$.fold((state, [scope, reducer]) => {
    return {
      ...state,
      // set the state at 'scope' to the result of applying the state at that
      // scope to the reducer at that scope
      [scope]: reducer(state[scope]),
    };
  }, {});

  return {state$};
}

const counterActions = {
  increment: xs.create(),
  decrement: xs.create(),
  reset: xs.create(),
};

const initialCounterState = 0;

const counterReducer$ = xs.merge(
  xs.of(() => initialCounterState),
  counterActions.increment.map(payload => state => payload + state),
  counterActions.decrement.map(payload => state => payload - state),
  counterActions.reset.map(_ => _ => initialCounterState)
);
const rootReducer$ = xs.merge(
  counterReducer$.map(counter => ['counter', counter])
);
const {dispatch, state$} = createState(rootReducer$);

counterActions.increment.shamefullySendNext(1); // No subscribers yet

state$.addListener({
  next(results) {
    // console.log(results);
  },
});

counterActions.increment.shamefullySendNext(2);
counterActions.increment.shamefullySendNext(1);
counterActions.reset.shamefullySendNext();

export {createState};
