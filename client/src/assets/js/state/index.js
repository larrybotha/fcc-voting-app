import Rx from 'rxjs';

const createState = (reducer$, initialState$ = Rx.Observable.of({})) => {
  return (
    initialState$
      .merge(reducer$)
      .scan((state, [scope, reducer]) => ({
        ...state,
        [scope]: reducer(state[scope]),
      }))
      // share state with all Observers when they subscribe
      .publishReplay(1)
      .refCount()
  );
};

const createActions = actionNames =>
  actionNames.reduce((acc, name) => ({...acc, [name]: new Rx.Subject()}), {});

export {createState, createActions};
