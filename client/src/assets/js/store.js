import createStore from './lib/xstream-store';
import {counterState$Creator, counterEffectsCreator} from './streams/counter';
import {userState$Creator, userEffectsCreator} from './streams/user';

const streamCreators = {
  counter: counterState$Creator,
  user: userState$Creator,
};

const effectCreators = [counterEffectsCreator, userEffectsCreator];

const store = createStore(streamCreators, effectCreators);

export default store;
