import xs from 'xstream';

function createStore(stateStreamCreators = {}, effectCreators = []) {
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

  const select = a$ => actionName => {
    return actionName ? a$.filter(({type}) => type === actionName) : a$;
  };

  // create a stream of reducers by taking a map of reducers, and then
  // filtering action$ for each reducer stream so that it only receives
  // events from the actions it is associated with
  const reducer$ = xs.merge(
    ...Object.keys(stateStreamCreators).map(scope => {
      const streamCreator = stateStreamCreators[scope];
      const $ = streamCreator(select(action$));

      return $.map(stream => [scope, stream]);
    })
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
  xs
    .merge(action$, state$)
    .subscribe({next() {}})
    .unsubscribe();

  effectCreators.map(effect => effect(select(action$), dispatch));

  return {dispatch, state$};
}

export default createStore;
