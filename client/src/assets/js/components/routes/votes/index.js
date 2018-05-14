import React from 'react';
import {Route, Switch} from 'react-router-dom';

import List from './List';
import Item from './Item';
import New from './New';

import routes from '../../../routes';

const VotesPage = () => (
  <Switch>
    <Route exact path={routes.votes} component={List} />
    <Route path={routes.votesNew} component={New} />
    <Route path={routes.votesItem} component={Item} />
  </Switch>
);

export default VotesPage;
