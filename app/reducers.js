import globalNavigation from './components/GlobalNavigation/reducer';
import tabs from './components/ApplicationTabs/reducer';
import feed from './components/Feed/reducer';

import {combineReducers} from 'redux-immutable';

export default function createReducer(){

    return combineReducers({
        globalNavigation,
        tabs,
        feed,
    });
}