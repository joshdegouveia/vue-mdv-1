import { createStore } from 'vuex';
import BooksModule, { BOOKS_KEY } from './books.state';

export default createStore({
  modules: {
    [BOOKS_KEY]: BooksModule,
  },
});
