import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers/index';

//import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(reducers);



ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
