import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import Provider from './components/stream';

import './lib/store';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.js-mount')
);

if (module.hot) {
  module.hot.accept();
}
