import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import XstreamContext from 'react-xstream-store';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Votes from './routes/votes';

import * as counterActions from '../actions/counter';

import Menu from './Menu';

import routes from '../routes';
import {auth$} from '../streams/auth';

const actions = {
  increment: {type: counterActions.INCREMENT, value: 1},
  decrement: {type: counterActions.DECREMENT, value: 1},
  request: {type: 'request'},
};

class App extends React.Component {
  componentDidMount() {
    auth$.addListener({
      next(e) {
        console.log(e);
      },
      error(e) {
        console.error(e);
      },
    });
  }

  render() {
    const {count, dispatch, decrement, increment, request} = this.props;

    return (
      <BrowserRouter>
        <>
          <XstreamContext.Consumer actions={actions}>
            {props => {
              const {counter, dispatch, decrement, increment, request} = props;

              return (
                <div>
                  <button onClick={() => dispatch(decrement)}>-</button>
                  {counter.count}
                  <button onClick={() => dispatch(increment)}>+</button>
                  <button onClick={() => dispatch(request)}>request</button>
                </div>
              );
            }}
          </XstreamContext.Consumer>

          <Menu />

          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.signup} component={Signup} />
            <Route path={routes.votes} component={Votes} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const {counter} = state;

  return {
    count: counter.count,
  };
};

export default hot(module)(App);
