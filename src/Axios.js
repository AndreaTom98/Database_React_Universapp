import axios from 'axios';

const firebase = axios.create({
    baseURL: "https://booktakeaway-default-rtdb.firebaseio.com/"
})

const googleBooks = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})


export {
    firebase,
    googleBooks,
} 