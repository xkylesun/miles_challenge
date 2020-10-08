import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rewardsReducer from '../reducers/reward_reducer';

const configureStore = (preloadedState = {}) => {
    let middleware = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middleware = [...middleware, logger];
    }
    return createStore(
        rewardsReducer,
        preloadedState,
        applyMiddleware(...middleware)
    );
};

export default configureStore;