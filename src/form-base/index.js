import { reactive } from 'vue';

export default class FormBase {
  formProps = {};

  formValue = reactive({});

  constructor(formProps) {
    this.formProps = formProps;
    Object.keys(formProps).forEach((propKey) => {
      this.formValue[propKey] = formProps[propKey].defaultValue;
    });
  }

  reset() {
    Object.keys(this.formProps).forEach((key) => {
      if (key in this.formValue) {
        this.formValue[key] = this.formProps[key].defaultValue;
      }
    });
  }

  patchValue(formValue) {
    Object.keys(formValue).forEach((key) => {
      if (key in this.formValue) {
        this.formValue[key] = formValue[key];
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get rules() {
    // eslint-disable-next-line max-len
    return Object.keys(this.formProps).reduce((acc, propKey) => ({ ...acc, [propKey]: this.formProps[propKey].validators }), {});
  }
}
