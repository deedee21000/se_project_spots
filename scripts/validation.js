const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

function showInputError(formEL, inputEL, errorMsg, config) {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(config.errorClass);
  inputEL.classList.add(config.inputErrorClass);
}

function hideInputError(formEL, inputEL, config) {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(config.errorClass);
  inputEL.classList.remove(config.inputErrorClass);
}

function checkInputValidity(formEL, inputEL, config) {
  if (!inputEL.validity.valid) {
    showInputError(formEL, inputEL, inputEL.validationMessage, config);
  } else {
    hideInputError(formEL, inputEL, config);
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputEL) => {
    return !inputEL.validity.valid;
  });
}

function toggleButtonState(inputList, buttonEl, config) {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(formEl, config) {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
}

enableValidation(settings);
function resetFormValidation(formEl, config) {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}
