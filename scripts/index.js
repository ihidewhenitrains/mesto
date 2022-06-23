const popupProfile = document.querySelector('#profile-pop-up');
const popupAddCard = document.querySelector('#add-card-pop-up');
const editProfileButton = document.querySelector('.profile-info__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileCloseButton = document.querySelector('#profile-popup-close-button');
const newCardCloseButton = document.querySelector('#addcard-popup-close-button');
const profileForm = document.querySelector('#profile-form');
const cardForm = document.querySelector('#card-form');
const cards = document.querySelector('.elements__list');
let profileName = document.querySelector('.profile-info__name');
let profileJob = document.querySelector('.profile-info__description');
let nameInput = document.querySelector('#profile-name-input');
let jobInput = document.querySelector('.pop-up__input_type_job');
let cardNameInput = document.querySelector('#card-name-input');
let cardImageLinkInput = document.querySelector('.pop-up__input_type_image-link');


//Дефолтные карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


//Добавление дефолтных карточек
initialCards.forEach((card) => { addCard(card) })


//Создание новой карточки (+ кнопки лайка и удаления)
function createCard(name, link) {
    const cardTemplate = document.querySelector('#element-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    card.querySelector('.element__heading').textContent = name;
    card.querySelector('.element__image').src = link;
    card.querySelector('.element__image').alt = name;

    card.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    card.querySelector('.element__delete-button').addEventListener('click', function () {
        card.remove();
    });

    return card;
}


//Добавление новой карточки
function addCard(card) {
    cards.prepend(createCard(card.name, card.link));
}


//Открытие поп-апов
function popupOpen(popup) {
    popup.classList.add('pop-up_opened');
}


//Открытие поп-апа редактирования профиля
function popupProfileOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    popupOpen(popupProfile);
}

editProfileButton.addEventListener('click', popupProfileOpen);


//Открытие поп-апа создания новой карточки
function popupAddCardOpen() {
    popupOpen(popupAddCard);
}

addCardButton.addEventListener('click', popupAddCardOpen);


//Закрытие поп-апов
function popupClose(evt) {
    if (evt.target === evt.currentTarget) {
        evt.target.closest('.pop-up').classList.remove('pop-up_opened');
    }
}

editProfileCloseButton.addEventListener('click', popupClose);
newCardCloseButton.addEventListener('click', popupClose);
popupProfile.addEventListener('click', popupClose);
popupAddCard.addEventListener('click', popupClose);


//Кнопка "Сохранить" для редактирования профиля
function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose(evt);
}

profileForm.addEventListener('submit', profileFormSubmitHandler);


//Кнопка "Создать" для новой карточки
function cardFormSubmitHandler(evt) {
    evt.preventDefault();

    const newcard = {
        name: `${cardNameInput.value}`,
        link: `${cardImageLinkInput.value}`
    };

    addCard(newcard);
    cardNameInput.value = '';
    cardImageLinkInput.value = '';
    popupClose(evt);
}

cardForm.addEventListener('submit', cardFormSubmitHandler);