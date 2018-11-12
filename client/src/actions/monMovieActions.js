import {
    GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE} from './types';
import axios from "axios";

export const getAllMoviesToMonMovies = () => dispatch => {
    console.log('fetching allMovise');
        axios.get('/api/movies/allmovies')
        .then(res => {
            dispatch({
                type: GET_ALLMOVIESTOMONMOVIES,
                payload: res.data.movies
            });
        }).catch(err => console.log(err));  
}