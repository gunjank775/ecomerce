import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
    return async(dispatch) => {

        dispatch({
            type: authConstants.LOGIN_REQUEST
        });
        let res,status,error="";
      try {
             res= await axios.post('/admin/signin',{
                ...user
            });
            status=res.status
       }
       catch(e){
           console.log("error")
            status=400
            error=e.message
       }

        if(status === 200) {
            const {token,user} = res.data;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload :{
                   token,user 
                }
            })
        } else {
            if(status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: error
                    }
                });
            }
        }

        
    }
}




export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload :{
                   token,user 
                }
            })
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }
    }
}


export const signout = () => {
    return async (dispatch) => {

        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })

        let res,status,error="";
      try {
             res= await axios.post('/admin/signout');
             status=res.status
       }
       catch(e){
           console.log("error")
            status=400
            error=e.message
       }

       if(status === 200) {
        localStorage.clear();
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })
    } else {
        if(status === 400) {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error: error
                }
            });
        }
    }

        
    }
}