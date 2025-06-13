const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const showInputError = (formEL, inputEL, errorMsg) => {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add("modal__error_active");
  inputEL.classList.add("modal__input_type_error");
};

const hideInputError = (formEL, inputEL) => {
  const errorMsgEl = formEL.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove("modal__error_active");
  inputEL.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEL, inputEL) => {
  if (!inputEL.validity.valid) {
    showInputError(formEL, inputEL, inputEL.validationMessage);
  } else {
    hideInputError(formEL, inputEL);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputEL) => {
    return !inputEL.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);

function resetFormValidation(formEl, config) {
  const inputList = formEl.querySelectorAll(config.inputSelector);
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });

  toggleButtonState(inputList, buttonElement, config);
}
