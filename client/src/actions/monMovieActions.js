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
            // dispatch({
            //     type: POST_MONMOVIE,
            //     payload: res.data
            // });
        }).catch(err => console.log(err));  
}