import {
    // GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE} from './types';
import axios from "axios";


// POST A MONMOVIE
export const postMonmovie = (data) => dispatch => {
    // console.log('posting movie');
    // console.log(data);
    
        axios.post('api/monthlyMovies/uploadMoviePremiere', data)
        .then(res => {
            // console.log(res);
            dispatch({
                type: POST_MONMOVIE,
                payload: res.data
            });
        }).catch(err => console.log(err));  
}

// GET ALL MONMOVIES
export const getAllMonMovies = () => dispatch => {
    // console.log('fetching all monMovies');

    axios.get('api/monthlyMovies/getAllMonthlyMovies')
    .then(res => {
        // console.log(res.data.monMovies);
        dispatch({
            type: GET_MONMOVIES,
            payload: res.data.monMovies
        });
    }).catch(err => console.log(err));  
} 

// DELETE A MONMOVIE
export const deleteMonMovie = movie => dispatch => {
    // console.log('Delete action starting');
    let objId = movie._id;
    axios.delete('api/monthlyMovies/deleteMonthlyMovie', {data:{objId}})
        .then( res => {
            if(res){
                dispatch({
                   type: DELETE_MONMOVIE,
                   payload: movie     
                });
            }else{
                console.log('något gick fel vid delete action monmovie');
                
            }
        }).catch(err => console.log(err));
}