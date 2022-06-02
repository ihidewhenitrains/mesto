const popup = document.querySelector('.pop-up');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.pop-up__close-button');
let profileName = document.querySelector('.profile-info__name');
let profileJob = document.querySelector('.profile-info__description');
let form = document.querySelector('.pop-up__form');
let nameInput = document.querySelector('.pop-up__input_name');
let jobInput = document.querySelector('.pop-up__input_job');

//Открытие и закрытие поп-апа
function popupOpen() {
    popup.classList.add('pop-up_opened');
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileJob.textContent;
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
function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose(evt);
}

form.addEventListener('submit', formSubmitHandler);
