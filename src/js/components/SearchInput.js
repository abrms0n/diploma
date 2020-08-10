export class SearchInput {
  constructor(callback, form) {
    this.callback = callback;
    this.form = form;
  }

  _checkInputValidity = (input) => {
    input.setCustomValidity('');
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

  _isFieldValid = (input) => {
    const errorElem = input.parentNode.querySelector(`.search-form__hint`);
    const answer = this._checkInputValidity(input);
    if (errorElem !== null ) {
      errorElem.textContent = input.validationMessage;
    }
    return answer;
  }

  _isFormValid = (form) => {
    const inputs = [...form.elements];
    let valid = true;
    inputs.forEach((input) => {
      if (input.type !== 'submit' && input.type !== 'button') {
        if (!this._isFieldValid(input)) {
          valid = false;
        }
      }
    });
    return valid
  }

  _sendForm = (event) => {
    event.preventDefault();
    const currentForm = event.target;
    const isValid = this._isFormValid(currentForm);
    if (isValid) {
      this._resetErrors();
    }
  }

  setSubmitButtonState = (button, state) => {
    if ( state ) {
      button.closest('.search-form').querySelector('.button_theme_blue').removeAttribute('disabled', '');
    } else if ( !state )  {
      button.closest('.search-form').querySelector('.button_theme_blue').setAttribute('disabled', '');
    }
  }

  _handlerInputForm = (event) => {
    const submit = event.currentTarget.querySelector('.button');
    const [...inputs] = event.currentTarget.elements;
    this._isFieldValid(event.target);
    if (inputs.every(this._isFieldValid)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }

  _resetErrors() {
    this.form.querySelectorAll('.search-form__hint').forEach((hint) => {
      hint.textContent = '';
    })
  }

  setEventListeners = () => {
    this.form.addEventListener('submit', this.callback); 
    this.form.addEventListener('input', this._handlerInputForm);
    this.form.addEventListener('submit', this._sendForm)
  }
}


