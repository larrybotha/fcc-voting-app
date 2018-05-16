import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Votes from './routes/votes';

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
    return (
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
    );
  }
}

export default hot(module)(App);
