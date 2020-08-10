export class SearchInput {
  constructor(callback, form) {
    this.callback = callback;
    this.form = form;
  }

  checkInputValidity = (input) => {
    input.setCustomValidity ('');

    if (input.validity.valueMissing) {
      input.setCustomValidity ('Это обязательное поле');
      return false
    }
    if (input.validity.tooLong || input.validity.tooShort) {
      input.setCustomValidity ('Должно быть от 2 до 30 символов');
      return false
    }
    if (input.validity.patternMismatch) {
      input.setCustomValidity ('Введите запрос на русском языке');
      return false
    }
    return input.checkValidity();
  }

  isFieldValid = (input) => {
    const errorElem = input.parentNode.querySelector(`.search-form__hint`);
    const answer = this.checkInputValidity(input);
    if (errorElem !== null ) {
      errorElem.textContent = input.validationMessage;
    }
    return answer;
  }

  isFormValid = (form) => {
    const inputs = [...form.elements];
    let valid = true;
    inputs.forEach((input) => {
      if (input.type !== 'submit' && input.type !== 'button') {
        if (!this.isFieldValid(input)) {
          valid = false;
        }
      }
    });
    return valid
  }

  sendForm = (event) => {
    event.preventDefault();
    const currentForm = event.target;
    const isValid = this.isFormValid(currentForm);

    if (isValid) {
      this.resetErrors();
    }
  }

  setSubmitButtonState = (button, state) => {
    if ( state ) {
      button.closest('.search-form').querySelector('.button_theme_blue').removeAttribute('disabled', '');
    } else if ( !state )  {
      button.closest('.search-form').querySelector('.button_theme_blue').setAttribute('disabled', '');
    }
  }

  handlerInputForm = (event) => {
    const submit = event.currentTarget.querySelector('.button');
    const [...inputs] = event.currentTarget.elements;

    this.isFieldValid(event.target);

    if (inputs.every(this.isFieldValid)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }

  resetErrors() {
    this.form.querySelectorAll('.search-form__hint').forEach((hint) => {
      hint.textContent = '';
    })
  }


  _setEventListeners = () => {
    this.form.addEventListener('submit', this.callback); 
    this.form.addEventListener('input', this.handlerInputForm);
    this.form.addEventListener('submit', this.sendForm)
  }


}


