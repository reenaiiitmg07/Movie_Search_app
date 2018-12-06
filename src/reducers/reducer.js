import {MOVIE_DATA} from '../actions/index';

export  function MovieData (state=[],action){
    console.log(action.payload);

    switch(action.type){

        case MOVIE_DATA:
            return [...state,action.payload.data.Search]

        default:
                return state
    }
}
