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

  // intialise dispatch by creating a subscription
  // unsubscribe because we no longer need the subscription
  action$.subscribe({next() {}}).unsubscribe();
  state$.subscribe({next() {}}).unsubscribe();

  return {dispatch, state$};
}

const createAlert$ = action$ =>
  xs.merge(
    action$.filter(({type}) => type === 'increment').map(action => state => {
      console.log(action, state);
    })
  );

export {createStore};
