import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Routes from './routes';
import rootReducer from './reducers'

const storeWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const App = () => {
    return (
        <Provider store={storeWithMiddleware(rootReducer)}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));

