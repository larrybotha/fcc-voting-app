import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Votes from './routes/votes';

import {connect} from './stream';
import {increment, decrement} from '../actions/counter';

import Menu from './Menu';

import routes from '../routes';
import {auth$} from '../streams/auth';

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
    const {counter, dispatch, decrement, increment, request} = this.props;

    return (
      <BrowserRouter>
        <>
          <button onClick={() => dispatch(decrement)}>-</button>
          {counter ? counter.count : 0}
          <button onClick={() => dispatch(increment)}>+</button>

          <button onClick={() => dispatch(request)}>request</button>
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

const connectedApp = connect(mapStateToProps, {
  increment: increment(1),
  decrement: decrement(1),
  request: {type: 'request'},
})(App);

export default hot(module)(connectedApp);
