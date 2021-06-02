<template>
  <el-row :gutter="20">
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      effect="dark"
    class="error-alert">
    </el-alert>
    <el-col :span="12">
      <el-button @click="throwRequestError">
        Throw Error
      </el-button>
      <div class="grid-content bg-purple">
        <BooksList
          :loading="loading"
          :books="books"
          @select-book="selectBook"
          @delete-book="deleteBook"/>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <BookDetails :selectedBook="selectedBook" @save-book="saveBook" @cancel="selectBook(null)"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import BooksList from '@/components/books-list/BooksList.vue';
import BookDetails from '@/components/book-details/BookDetails.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Books',
  components: {
    BooksList,
    BookDetails,
  },
  setup() {
    const store = useStore();

    store.dispatch('loadAllBooks');

    return {
      selectBook: (bookId) => store.dispatch('selectBook', bookId),
      saveBook: (book) => {
        const actionType = book.id ? 'updateBook' : 'addBook';
        store.dispatch(actionType, book);
        store.dispatch('selectBook', null);
      },
      deleteBook: (bookId) => store.dispatch('deleteBook', bookId),
      throwRequestError: () => store.dispatch('throwRequestError'),
      books: computed(() => store.getters.books),
      selectedBook: computed(() => store.getters.selectedBook),
      loading: computed(() => store.getters.booksLoading),
      error: computed(() => store.getters.booksError),
    };
  },
};
</script>

<style>
.error-alert {
  margin-bottom: 20px;
}
</style>
