import axios from 'axios';

export function getBooks(limit=3, skip=0, order="asc", list='') {    

    const request = axios.get(`/api/books?limit=${limit}&skip=${skip}&order=${order}`)
                         .then(response => {
                             if (list) {
                                 return [...list, ...response.data]
                             } else {
                                 return response.data
                             }
                         })

    return {
        type : 'GET_BOOKS',
        payload : request
    }

}

export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`);

    return (dispatch) => {
        request.then(({data}) => {
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                 .then(({data}) => {
                     let response = {
                         book,
                         reviewer : data
                     }
                    //  console.log(response);
                     dispatch({
                         type : 'GET_BOOK_W_REVIEWER',
                         payload : response
                     })
                 })
        })
    }

}

export function clearBookView() {
    return {
        type : 'CLEAR_BOOK_VIEW',
        payload : {
            book : {},
            reviewer : {}
        }
    }
}



/*==User Actions==*/
export function loginUser({email, password}) {

    const request = axios.post(`/api/user/login`, {email, password})
                        .then(response => response.data)

    return {
        type : 'USER_LOGIN',
        payload : request
    }
}

export function auth() {
    const request = axios.get('/api/user/auth')
                         .then(response => response.data);

    return {
        type : 'AUTH_USER',
        payload : request
    }                         
}

export function addBook(book) {
    const request = axios.post('/api/book', book)
                         .then(response => response.data);

    return {
        type:'ADD_BOOK',
        payload : request
    }                         
}

export function clearBook() {
    return {
        type : 'CLEAR_BOOK',
        payload : ''
    }
}

export function getUserReviews(id) {
    const request = axios.get(`/api/book/byUser?user=${id}`)
                        .then(response => response.data)

    return {
        type : 'GET_USER_REVIEWS',
        payload : request
    }
}

export function getSingleBook(id) {
    const request = axios.get(`/api/getBook?id=${id}`)
                         .then(response => response.data)

    return {
        type : 'GET_SINGLE_BOOK',
        payload : request
    }
}

export function updateSingleBook(id, doc) {
    const request = axios.post(`/api/book_update/${id}`, doc)
                         .then(response => response.data)

    return {
        type : 'UPDATE_SINGLE_BOOK',
        payload : request
    }                         
}

export function deleteBook(id) {
    const request = axios.delete(`/api/book_delete/${id}`) 
                         .then(response => response.data)
    return {
        type : 'DELETE_BOOK',
        payload : request
    }                        
}

export function getAllUsers() {
    const request = axios.get('/api/users')
                         .then(response => response.data)
    return {
        type : 'GET_ALL_USERS',
        payload : request
    }                         
}

export function registerUser(doc, userList) {
    const request = axios.post('/api/user/signup', doc);
    
    return (dispatch) => {
        request.then(({data}) => {
            let users = data.success ? [...userList, data.userDetails] : userList;
            
            let response = {
                success: data.success,
                users
            }

            dispatch({
                type : 'SIGN_UP',
                payload : response
            })
        })
    }


    // return {
    //     type : 'SIGN_UP',
    //     payload : request
    // }
}