import {
    // GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE
} from '../actions/types';

// const initialState = {
//     monMovies: []
// };

const initialState = {};

export default function(state = initialState, action ) {
    // console.log('reducer starts')
    switch (action.type) {
        case POST_MONMOVIE:
            return {
                ...state, 
                monMovies: [...state.monMovies, action.payload]
                
            };
        case GET_MONMOVIES:
            // console.log('payload ',action.payload);
            return {
                ...state,
                monMovies: action.payload 
            };
        case DELETE_MONMOVIE:
            let newMonMovieState = removeMonMovie(action.payload, state.monMovies);
            return {
                ...state,
                monMovies: newMonMovieState
            }
        default: 
            return state;
    }
}


const removeMonMovie = (deleteItem, stateArray) => {
    let updatedList = stateArray.filter( item => item !== deleteItem);
    return updatedList;
}