const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__save-button',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__input-error_active'
}

//показать ошибку
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add('pop-up__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('pop-up__input-error_active');
}

//убрать ошибку
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove('pop-up__input_type_error');
    errorElement.classList.remove('pop-up__input-error_active');
    errorElement.textContent = '';
}

//проверить валидность ввода
function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

//установить слушатели на валидность всем полям ввода
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.pop-up__input'));
    const buttonElement = formElement.querySelector('.pop-up__save-button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
        });
    });
}

//включить валидацию
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.pop-up__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    });
}

//проверить есть ли невалидный ввод хотя бы в одном из полей формы
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//включение и выключение кнопки в зависимости от валидности формы
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', 'disabled')
    } else {
        buttonElement.removeAttribute('disabled');
    }
}

enableValidation();