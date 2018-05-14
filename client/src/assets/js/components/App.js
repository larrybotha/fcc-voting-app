import React from 'react';
import {hot} from 'react-hot-loader';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Votes from './routes/votes';

import Menu from './Menu';

import routes from '../routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route exact path={routes.login} component={Login} />
            <Route path={routes.votes} component={Votes} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
