
export default function(state={}, action) {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                login : action.payload
            }
        case 'AUTH_USER':
            return {
                ...state,
                login : action.payload
            }
        case 'GET_USER_REVIEWS' :
            return {
                ...state,
                reviews : action.payload
            }
        case 'GET_ALL_USERS' :
            return {
                ...state,
                users : action.payload
            }
        case 'SIGN_UP' :
            return {
                ...state,
                success : action.payload.success,
                users : action.payload.users
            }
        default :
            return state;
    }
}