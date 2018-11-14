import {
    // GET_ALLMOVIESTOMONMOVIES, 
    GET_MONMOVIES, 
    POST_MONMOVIE, 
    DELETE_MONMOVIE, 
    UPDATE_MONMOVIE
} from '../actions/types';

// const initialState = {
//     monmovies: [],
//     monmovie: {}
// };

const initialState = {};

export default function(state = initialState, action ) {
    // console.log('reducer starts')
    switch (action.type) {
        case POST_MONMOVIE:
            console.log(action.payload);
            
            // return {
            //     ...state,
            //     monmovies: action.payload
            // };
        default: 
            return state;
    }
}
