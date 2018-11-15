import {
    // GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE} from './types';
import axios from "axios";

export const postMonmovie = (data) => dispatch => {
    console.log('posting movie');
    console.log(data);
    
        axios.post('api/monthlyMovies/uploadMoviePremiere', data)
        .then(res => {
            console.log(res);
            dispatch({
                type: POST_MONMOVIE,
                payload: res.data
            });
        }).catch(err => console.log(err));  
}

export const getAllMonMovies = () => dispatch => {
    console.log('fetching all monMovies');

    axios.get('api/monthlyMovies/getAllMonMovies')
    .then(res => {
        console.log(res.data.monMovies);
        dispatch({
            type: GET_MONMOVIES,
            payload: res.data.monMovies
        });
    }).catch(err => console.log(err));  
} 