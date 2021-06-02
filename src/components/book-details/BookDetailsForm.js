/* eslint-disable lines-between-class-members */
import FormBase from '@/form-base';

const bookDetailFormProps = {
  id: {
    defaultValue: null,
    validators: [],
  },
  title: {
    defaultValue: '',
    validators: [
      { required: true, message: 'Please input title' },
    ],
  },
  description: {
    defaultValue: '',
    validators: [
      { required: true, message: 'Please input description' },
    ],
  },
  author: {
    defaultValue: '',
    validators: [
      { required: true, message: 'Please input author' },
    ],
  },
};

export default class BookDetailsForm extends FormBase {
  constructor() {
    super(bookDetailFormProps);
  }
}
