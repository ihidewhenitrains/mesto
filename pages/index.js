//Открытие и закрытие поп-апа
const popup = document.querySelector('.pop-up');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.pop-up__close-button');

function popupOpen() {
    popup.classList.add('pop-up_opened');
}

function popupClose(e) {
    if (e.target === e.currentTarget) {
        popup.classList.remove('pop-up_opened');
    }
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupClose);


//Кнопка "Сохранить"
let form = document.querySelector('.pop-up__form');
let nameInput = document.querySelector('.pop-up__name');
let jobInput = document.querySelector('.pop-up__description');
const submitButton = document.querySelector('.pop-up__save-button');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let profileName = document.querySelector('.profile-info__name');
    let profileJob = document.querySelector('.profile-info__description');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

form.addEventListener('submit', formSubmitHandler);
submitButton.addEventListener('click', popupClose);
