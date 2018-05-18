import xs from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';

function createStore(streamCreators) {
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

  // intialise dispatch by creating a subscription
  // unsubscribe because we no longer need the subscription
  action$.subscribe({next() {}}).unsubscribe();

  // create a stream of reducers by taking a map of reducers, and then
  // filtering action$ for each reducer stream so that it only receives
  // events from the actions it is associated with
  const reducer$ = xs.merge(
    ...Object.keys(streamCreators).map(scope =>
      streamCreators[scope](action$).map(stream => [scope, stream])
    )
  );

  const state$ = reducer$.fold((state, [scope, reducer]) => {
    return {
      ...state,
      // set the state at 'scope' to the result of applying the state at that
      // scope to the reducer at that scope
      [scope]: reducer(state[scope]),
    };
  }, {});

  return {dispatch, state$};
}

const counterActions = {
  increment: 'increment',
  decrement: 'decrement',
  reset: 'reset',
};

const initialCounterState = {count: 0};

const createCounter$ = action$ =>
  xs.merge(
    xs.of(() => initialCounterState),
    action$
      .filter(({type}) => type === 'increment')
      .map(action => state => ({...state, count: action.count + state.count})),
    action$
      .filter(({type}) => type === 'reset')
      .map(_ => _ => initialCounterState)
  );

const streamCreators = {
  counter: createCounter$,
};

const {dispatch, state$} = createStore(streamCreators);

dispatch({type: 'increment', count: 1}); // No subscribers yet

state$
  .map(({counter}) => counter)
  .compose(dropRepeats())
  .filter(x => x !== undefined)
  .subscribe({
    next(results) {
      console.log(results);
    },
    error(e) {
      console.error(e);
    },
  });

dispatch({type: 'increment', count: 2});
dispatch({type: 'increment', count: 1});
dispatch({type: 'reset'});

export {createStore};
