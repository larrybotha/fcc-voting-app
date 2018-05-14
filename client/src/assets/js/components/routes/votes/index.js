import React from 'react';
import {Route, Switch} from 'react-router-dom';

import List from './List';
import Item from './Item';
import New from './New';

import routes from '../../../routes';

const VotesPage = () => (
  <Switch>
    <Route exact path="/" component={List} />
    <Route exact path={routes.Item} component={Item} />
    <Route exact path={routes.New} component={New} />
  </Switch>
);

export default VotesPage;
