import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import XstreamContext from 'react-xstream-store';

import store from './store';

render(
  <XstreamContext.Provider value={store}>
    <App />
  </XstreamContext.Provider>,
  document.querySelector('.js-mount')
);

if (module.hot) {
  module.hot.accept();
}
