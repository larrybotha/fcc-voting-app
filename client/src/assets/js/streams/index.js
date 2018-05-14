import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

const connect = (selector = state => state, actionSubjects) => {
  const actions = Object.keys(actionSubjects).reduce((acc, key) => {
    return {...acc, [key]: value => actionSubjects[key].next(value)};
  });

  const wrapWithConnect = ComponentToWrap => {
    class ConnectedComponent extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired,
      };

      componentWillMount() {
        this.subscription = this.context.state$
          .map(selector)
          .subscribe.bind(this, this.setState);
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return <ComponentToWrap {...this.state} {...this.props} {...actions} />;
      }
    }
  };

  return wrapWithConnect;
};

export {connect, createActions, createState};
