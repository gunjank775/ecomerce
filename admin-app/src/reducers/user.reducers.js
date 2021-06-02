import { userConstants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state= initState,action) =>{
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state= {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state= {
                ...state,
                error: null,
                message: action.payload.message,
                loading: false
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state= {
                ...state,
                error:action.payload.error,
                message:'',
                loading: false
            }
            break;
    }
    return state;
}