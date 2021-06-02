<template>
  <el-card class="box-card">
    Book Details
    <el-form ref="formRef" :model="formValue" :rules="formRules" label-width="120px">
      <el-form-item label="Title"
                    prop="title">
        <el-input placeholder="Title" id="title" v-model="formValue.title" />
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input
          placeholder="Description"
          id="description"
          v-model="formValue.description"
        />
      </el-form-item>

      <el-form-item label="Author" prop="author">
        <el-input placeholder="Author Name" id="author" v-model="formValue.author" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(formValue)">Save</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { watch, ref } from 'vue';
import BookDetailsForm from './BookDetailsForm';

export default {
  name: 'BookDetails',
  props: ['selectedBook'],
  emits: ['saveBook', 'cancel'],
  setup(props, { emit }) {
    const formRef = ref(null);
    const form = new BookDetailsForm();

    watch(() => props.selectedBook, () => {
      if (props.selectedBook) {
        form.patchValue(props.selectedBook);
      }
    });

    function resetFormAndValidators() {
      form.reset();
      formRef.value.resetFields();
    }

    function saveBook(book) {
      emit('saveBook', { ...book });
      resetFormAndValidators();
    }

    return {
      formRef,
      formValue: form.formValue,
      formRules: form.rules,
      submitForm: async (book) => {
        await formRef.value.validate((valid) => (valid ? saveBook(book) : false));
      },
      cancel: () => {
        emit('cancel');
        resetFormAndValidators();
      },
    };
  },
};
</script>
