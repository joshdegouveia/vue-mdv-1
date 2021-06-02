<template>
  <el-card class="box-card" v-loading="loading">
    <el-table
      :data="books"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="Title"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="Description"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="180">
      </el-table-column>
      <el-table-column
        label="Operations">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="$emit('selectBook', scope.row.id)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="$emit('deleteBook', scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'BooksList',
  props: ['books', 'loading'],
  emits: ['selectBook', 'deleteBook'],
};
</script>
