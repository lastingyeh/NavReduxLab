import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import App from './components/App';

const store = configureStore();

const Setup = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

export default Setup;