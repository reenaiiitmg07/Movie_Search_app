import { combineReducers } from 'redux';

import {MovieData} from './reducer';


let rootReducer = combineReducers({
    data:MovieData
});

export default rootReducer;
