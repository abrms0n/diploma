export class SearchInput {
  constructor(callback, form) {
    this.callback = callback;
    this.form = form;
  }

  setEventListeners = () => {
    this.form.addEventListener('submit', this.callback); 
  }
  
}

