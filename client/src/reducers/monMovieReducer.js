import {
    // GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE
} from '../actions/types';

// const initialState = {
//     monmovies: [],
// };

const initialState = {};

export default function(state = initialState, action ) {
    // console.log('reducer starts')
    switch (action.type) {
        case POST_MONMOVIE:
            return {
                ...state, 
                monMovies: [...state.monmovies, action.payload]
                
            };
        case GET_MONMOVIES:
            console.log('payload ',action.payload);
            return {
                ...state,
                monMovies: action.payload 
            };
        default: 
            return state;
    }
}
