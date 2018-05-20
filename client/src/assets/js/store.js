// import createStore from './lib/xstream-store';
import {createStore} from './lib/store2';

import createCounter$ from './streams/counter';

const streamCreators = {
  counter: createCounter$,
};

const store = createStore(streamCreators);

export default store;
