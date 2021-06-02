/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const delayRequest = (request) => new Promise(
  (resolve, reject) => setTimeout(async () => request().then(resolve).catch(reject), 1000),
);

export const loadBooks = () => delayRequest(() => axios.get(`${apiUrl}/books`));
export const addBook = (book) => delayRequest(() => axios.post(`${apiUrl}/books`, book));
export const updateBook = (book) => delayRequest(() => axios.put(`${apiUrl}/books/${book.id}`, book));
export const deleteBook = (bookId) => delayRequest(() => axios.delete(`${apiUrl}/books/${bookId}`));
export const requestError = () => axios.get('error');
