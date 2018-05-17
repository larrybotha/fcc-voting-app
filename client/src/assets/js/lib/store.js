import xs from 'xstream';

function createState(reducer$, initialState = {}) {
  let dispatch;
  // create an action stream with a producer
  // We assign 'dispatch' to the broadcast so that we can broadcast events
  const action$ = xs.create({
    start(listener) {
      dispatch = action => {
        // broadcast the action to all listeners on the action$
        return listener.next(action);
      };
    },
    stop() {},
  });

  // create a stream of reducers by taking a map of reducers, and then
  // filtering action$ for each reducer stream so that it only receives
  // events from the actions it is associated with

  const state$ = reducer$.fold((state, [scope, reducer]) => {
    return {
      ...state,
      // set the state at 'scope' to the result of applying the state at that
      // scope to the reducer at that scope
      [scope]: reducer(state[scope]),
    };
  }, initialState);

  return {state$, dispatch};
}

const add$ = xs.create();
const counterReducer$ = add$.map(payload => state => state + payload);
const rootReducer$ = counterReducer$.map(counter => ['counter', counter]);
const {dispatch, state$} = createState(rootReducer$, {counter: 10});

add$.shamefullySendNext(1); // No subscribers yet

state$.addListener({
  next(results) {
    console.log(results);
  },
});

add$.shamefullySendNext(2);
add$.shamefullySendComplete();

export {createState};
