import axios from 'axios';

export const MOVIE_DATA='MOVIE_DATA';
export const MOVIE_TERM_DATA='MOVIE_TERM_DATA';
export function getMovieData(page){
    let data=axios.get("http://www.omdbapi.com/?s=marvel&apikey=5ce2c41a&page="+page);
    return{
        type:MOVIE_DATA,
        payload:data
    }

}
