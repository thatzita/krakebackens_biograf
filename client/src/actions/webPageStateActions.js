import {
    ADMIN_PAGE_TRUE,
    ADMIN_PAGE_FALSE
} from "./types";

// Change or leave admon page, send in a true or false value
export const goToAdminPage = (value) => dispatch => {
    if(value){
        dispatch({
            type: ADMIN_PAGE_TRUE
        });
        localStorage.setItem('adminPage', true);
    }else{
        dispatch({
            type: ADMIN_PAGE_FALSE
        });
        localStorage.removeItem('adminPage');
    }
}
