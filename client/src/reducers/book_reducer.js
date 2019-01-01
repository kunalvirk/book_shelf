export default function(state={}, action) {
    switch(action.type) {
        case 'GET_BOOK_W_REVIEWER' : 
            return {
                ...state,
                book : action.payload.book,
                reviewer : action.payload.reviewer
            }
        case 'GET_BOOKS' : 
            return {...state, list:action.payload}
        case 'CLEAR_BOOK_VIEW' : 
             return {
                ...state,
                book : action.payload.book,
                reviewer : action.payload.reviewer
            }
        case 'ADD_BOOK' :
            return {
                ...state,
                newBook : action.payload
            }
        case 'CLEAR_BOOK' :
            return {
                ...state,
                newBook : action.payload
            }
        case 'GET_SINGLE_BOOK' :
            return {
                ...state,
                singleBook : action.payload
            }
        case 'UPDATE_SINGLE_BOOK' :
            return {
                ...state,
                updateBook : action.payload.success,
                singleBook : action.payload.details
            }
        case 'DELETE_BOOK' :
            return {
                ...state,
                bookDeleted : action.payload
            }
        default :
            return state;
    }
}