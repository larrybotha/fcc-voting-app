import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-xstream-store';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Votes from './routes/votes';

import Menu from './Menu';

import routes from '../routes';
import {auth$} from '../streams/auth';
import store from '../store';

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
      <Provider store={store}>
        <BrowserRouter>
          <>
            <Menu />

            <Switch>
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.signup} component={Signup} />
              <Route path={routes.votes} component={Votes} />
            </Switch>
          </>
        </BrowserRouter>
      </Provider>
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
