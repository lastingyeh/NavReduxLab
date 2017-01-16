import {createStore, compose} from 'redux';
import {fromJS} from 'immutable';
import devTools from 'remote-redux-devtools';

import createReducer from './reducers';

export default configureStore = (initialState = fromJS({})) => {

    const createStoreWithMiddleware = compose(devTools())(createStore);

    return createStoreWithMiddleware(createReducer(), initialState);
}