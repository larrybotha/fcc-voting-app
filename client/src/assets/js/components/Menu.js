import React from 'react';
import {Link} from 'react-router-dom';

import routes from '../routes';

const Menu = () => (
  <div>
    {Object.keys(routes).map((key, i, arr) => (
      <span key={key}>
        <Link to={routes[key]}>{key}</Link>

        {i < arr.length - 1 ? ' | ' : ''}
      </span>
    ))}
  </div>
);

export default Menu;
