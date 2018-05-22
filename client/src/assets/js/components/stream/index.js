import React, {Component} from 'react';
import PropTypes from 'prop-types';

const defaultSelector = state => state;

const connect = (selector, actions = {}) => {
  const wrapWithConnect = WrappedComponent => {
    return class Connect extends Component {
      static contextTypes = {
        state$: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
      };

      componentDidMount() {
        const selected$ = this.context.state$.map(selector || defaultSelector);

        this.subscription = selected$.subscribe({
          next: state => {
            this.setState(state);
          },
          error(e) {
            console.log(e);
          },
        });
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent
            {...this.state}
            {...this.props}
            {...actions}
            dispatch={this.context.dispatch}
          />
        );
      }
    };
  };

  return wrapWithConnect;
};

class Provider extends Component {
  static propTypes = {
    store: PropTypes.shape({
      state$: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  static childContextTypes = {
    state$: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  getChildContext() {
    const {state$, dispatch} = this.props.store;

    return {state$, dispatch};
  }

  render() {
    return this.props.children;
  }
}

export {connect};

export default Provider;
