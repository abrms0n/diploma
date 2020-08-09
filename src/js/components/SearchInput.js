export class SearchInput {
  constructor(callback, form) {
    this.callback = callback;
    this.form = form;
  }

  _setEventListeners = () => {
    this.form.addEventListener('submit', this.callback); 
  }
}

