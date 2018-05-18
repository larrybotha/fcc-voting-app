import React from 'react';
import {render} from 'react-dom';

import App from './components/App';

import './lib/store';
import './lib/store2';

render(<App />, document.querySelector('.js-mount'));

if (module.hot) {
  module.hot.accept();
}
