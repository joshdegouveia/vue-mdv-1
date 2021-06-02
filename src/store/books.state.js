import {
  addBook, loadBooks, updateBook, deleteBook,
  requestError,
} from '../services';
import { handleError } from '../utils';

export const BOOKS_KEY = 'books';

export const SELECT_BOOK = 'SELECT_BOOK';

export const LOAD_ALL_BOOKS = 'LOAD_ALL_BOOKS';
export const LOAD_ALL_BOOKS_SUCCESS = 'LOAD_ALL_BOOKS_SUCCESS';
export const LOAD_ALL_BOOKS_ERROR = 'LOAD_ALL_BOOKS_ERROR';

export const LOAD_BOOK = 'LOAD_BOOK';
export const LOAD_BOOK_SUCCESS = 'LOAD_BOOK_SUCCESS';
export const LOAD_BOOK_ERROR = 'LOAD_BOOK_ERROR';

export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_ERROR = 'ADD_BOOK_ERROR';

export const UPDATE_BOOK = 'UPDATE_BOOK';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_ERROR = 'UPDATE_BOOK_ERROR';

export const DELETE_BOOK = 'DELETE_BOOK';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const DELETE_BOOK_ERROR = 'DELETE_BOOK_ERROR';

export const THROW_REQUEST_ERROR = 'THROW_REQUEST_ERROR';

export default {
  state: {
    selectedBookId: null,
    loading: false,
    error: null,
    entities: [],
  },
  actions: {
    selectBook: async ({ commit }, bookId) => {
      commit(SELECT_BOOK, bookId);
    },
    loadAllBooks: async ({ commit }) => {
      commit(LOAD_ALL_BOOKS);
      try {
        const response = await loadBooks();
        const res = response.data;
        commit(LOAD_ALL_BOOKS_SUCCESS, res);
      } catch (error) {
        commit(LOAD_ALL_BOOKS_ERROR, handleError(error));
      }
    },
    addBook: async ({ commit }, book) => {
      commit(ADD_BOOK);
      try {
        const response = await addBook(book);
        const res = response.data;
        commit(ADD_BOOK_SUCCESS, res);
      } catch (error) {
        commit(ADD_BOOK_ERROR, handleError(error));
      }
    },
    updateBook: async ({ commit }, book) => {
      commit(UPDATE_BOOK);
      try {
        const response = await updateBook(book);
        const res = response.data;
        commit(UPDATE_BOOK_SUCCESS, res);
      } catch (error) {
        commit(UPDATE_BOOK_ERROR, handleError(error));
      }
    },
    deleteBook: async ({ commit }, bookId) => {
      commit(DELETE_BOOK);
      try {
        await deleteBook(bookId);
        commit(DELETE_BOOK_SUCCESS, bookId);
      } catch (error) {
        commit(DELETE_BOOK_ERROR, handleError(error));
      }
    },
    throwRequestError: async ({ commit }) => {
      commit(THROW_REQUEST_ERROR);
      try {
        await requestError();
        commit(THROW_REQUEST_ERROR, '');
      } catch (error) {
        commit(THROW_REQUEST_ERROR, handleError(error));
      }
    },
  },
  mutations: {
    [SELECT_BOOK]: (state, bookId) => {
      state.selectedBookId = bookId;
    },
    [LOAD_ALL_BOOKS]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [LOAD_ALL_BOOKS_SUCCESS]: (state, books) => {
      state.entities = books;
      state.loading = false;
      state.error = null;
    },
    [LOAD_ALL_BOOKS_ERROR]: (state, error) => {
      state.entities = [];
      state.loading = false;
      state.error = error;
    },
    [LOAD_BOOK]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [LOAD_BOOK_SUCCESS]: (state, book) => {
      state.entities = [...state.entities, book];
      state.loading = false;
      state.error = null;
    },
    [LOAD_BOOK_ERROR]: (state, error) => {
      state.loading = false;
      state.error = error;
    },
    [ADD_BOOK]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [ADD_BOOK_SUCCESS]: (state, book) => {
      state.entities = [...state.entities, book];
      state.loading = false;
      state.error = null;
    },
    [ADD_BOOK_ERROR]: (state, error) => {
      state.loading = false;
      state.error = error;
    },
    [UPDATE_BOOK]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [UPDATE_BOOK_SUCCESS]: (state, book) => {
      state.entities = state.entities.map((b) => (b.id === book.id ? book : b));
      state.loading = false;
      state.error = null;
    },
    [UPDATE_BOOK_ERROR]: (state, error) => {
      state.loading = error;
      state.error = error;
    },
    [DELETE_BOOK]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [DELETE_BOOK_SUCCESS]: (state, bookId) => {
      state.entities = state.entities.filter((b) => b.id !== bookId);
      state.loading = false;
      state.error = null;
    },
    [DELETE_BOOK_ERROR]: (state, error) => {
      state.loading = false;
      state.error = error;
    },
    [THROW_REQUEST_ERROR]: (state, error) => {
      state.error = error;
    },
  },
  getters: {
    booksLoading: (state) => state.loading,
    booksError: (state) => state.error,
    selectedBook: (state) => state.entities.find((b) => b.id === state.selectedBookId),
    books: (state) => state.entities,
  },
};
