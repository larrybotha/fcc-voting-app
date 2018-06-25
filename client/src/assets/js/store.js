import createStore from 'xstream-store';

import {userState$Creator, userEffectsCreator} from './streams/user';

const streamCreators = {
  user: userState$Creator,
};

const effectCreators = [userEffectsCreator];

const store = createStore(streamCreators, effectCreators);

export default store;
