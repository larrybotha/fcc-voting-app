import {createState} from './index';
import {reducer$ as counterReducer$} from './counter';

const reducers = {
  counter: counterReducer$,
};
