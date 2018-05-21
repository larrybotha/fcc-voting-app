import createStore from './lib/xstream-store';
import {createCounterState$, createCounterEffect$} from './streams/counter';

const streamCreators = {
  counter: createCounterState$,
};

const effectCreators = [createCounterEffect$];

const store = createStore(streamCreators, effectCreators);

export default store;
