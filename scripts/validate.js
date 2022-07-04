//показать ошибку
function showInputError(inputElement) {
    inputElement.classList.add('pop-up__input_type_error');
}

//убрать ошибку
function hideInputError(inputElement) {
    inputElement.classList.remove('pop-up__input_type_error');
}

//проверить валидность ввода
function checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement);
    } else {
        hideInputError(inputElement);
    }
}

//установить слушатели на валидность всем полям ввода
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.pop-up__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement);
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

enableValidation();


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation({
//   formSelector: '.popup__form',
//    inputSelector: '.popup__input',
//    submitButtonSelector: '.popup__button',
//    inactiveButtonClass: 'popup__button_disabled',
//    inputErrorClass: 'popup__input_type_error',
//    errorClass: 'popup__error_visible'
//  });