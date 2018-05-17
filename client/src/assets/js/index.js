import React from 'react';
import {render} from 'react-dom';

import App from './components/App';

import './lib/store';

render(<App />, document.querySelector('.js-mount'));

if (module.hot) {
  module.hot.accept();
}
