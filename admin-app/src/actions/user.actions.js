import axios from "../helpers/axios";
import { userConstants } from "./constants";


export const signup = (user) => {
    return async(dispatch) => {

        dispatch({
            type: userConstants.USER_REGISTER_REQUEST
        });
        let res,status,error="";
      try {
             res= await axios.post('/admin/signup',{
                ...user
            });
            status=res.status
       }
       catch(e){
           console.log(e)
            status=400
            error=e.message
       }

        if(status === 201) {
            console.log(res)
            const { message }  = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload :{
                   message:message
                }
            })
        } else {
            if(status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: error
                    }
                });
            }
        }

        
    }
}