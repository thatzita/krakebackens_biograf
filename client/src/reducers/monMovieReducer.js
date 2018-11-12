import {GET_MONMOVIES, POST_MONMOVIE, DELETE_MONMOVIE, UPDATE_MONMOVIE} from '../actions/types';

const initialState = {
    monmovies: [],
    monmovie: {}
};

export default function(state = initialState, action ) {
    switch(action.type){

        default: 
            return state;
    }
}
