const profilePopup = document.querySelector('#profile-pop-up');
const addCardPopup = document.querySelector('#add-card-pop-up');
const editProfileButton = document.querySelector('.profile-info__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileCloseButton = document.querySelector('#profile-popup-close-button');
const newCardCloseButton = document.querySelector('#addcard-popup-close-button');
const previewCloseButton = document.querySelector('#preview-popup-close-button');
const profileForm = document.querySelector('#profile-form');
const newCardForm = document.querySelector('#card-form');
const cardsContainer = document.querySelector('.elements__list');
const previewPopup = document.querySelector('#preview-pop-up');
const previewImage = document.querySelector('.pop-up__image-preview');
const previewName = document.querySelector('.pop-up__image-heading');
const profileJob = document.querySelector('.profile-info__description');
const nameInput = document.querySelector('#profile-name-input');
const profileName = document.querySelector('.profile-info__name');
const jobInput = document.querySelector('.pop-up__input_type_job');
const cardNameInput = document.querySelector('#card-name-input');
const cardImageLinkInput = document.querySelector('.pop-up__input_type_image-link');
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');


//Добавление дефолтных карточек
initialCards.forEach((card) => { addCard(card) })


//Создание новой карточки (+ кнопки лайка и удаления, просмотр карточки)
function createCard(newcard) {
    const cardContainer = cardTemplate.cloneNode(true);
    const cardImage = cardContainer.querySelector('.element__image');
    const cardName = cardContainer.querySelector('.element__heading');

    cardName.textContent = newcard.name;
    cardImage.src = newcard.link;
    cardImage.alt = newcard.name;

    //кнопка лайка
    cardContainer.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    //кнопка удаления карточки
    cardContainer.querySelector('.element__delete-button').addEventListener('click', function () {
        cardContainer.remove();
    });

    //просмотр картинки
    cardImage.addEventListener('click', function () {
        openPopup(previewPopup);
        previewImage.src = cardImage.src;
        previewImage.alt = cardImage.alt;
        previewName.textContent = cardName.textContent;
    });

    return cardContainer;
}


//Добавление новой карточки
function addCard(card) {
    cardsContainer.prepend(createCard(card));
}


//Открытие поп-апов
function openPopup(popup) {
    popup.classList.add('pop-up_opened');
}


//Открытие поп-апа редактирования профиля
function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(profilePopup);
}

editProfileButton.addEventListener('click', openProfilePopup);


//Открытие поп-апа создания новой карточки
function openAddCardPopup() {
    openPopup(addCardPopup);
}

addCardButton.addEventListener('click', openAddCardPopup);


//Закрытие поп-апов
function closePopup(evt) {
    if (evt.target === evt.currentTarget) {
        evt.target.closest('.pop-up').classList.remove('pop-up_opened');
    }
}

editProfileCloseButton.addEventListener('click', closePopup);
newCardCloseButton.addEventListener('click', closePopup);
profilePopup.addEventListener('click', closePopup);
addCardPopup.addEventListener('click', closePopup);
previewCloseButton.addEventListener('click', closePopup);
previewPopup.addEventListener('click', closePopup);


//Кнопка "Сохранить" для редактирования профиля
function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(evt);
}

profileForm.addEventListener('submit', profileFormSubmitHandler);


//Кнопка "Создать" для новой карточки
function newCardFormSubmitHandler(evt) {
    evt.preventDefault();

    const newcard = {
        name: `${cardNameInput.value}`,
        link: `${cardImageLinkInput.value}`
    };

    addCard(newcard);
    cardNameInput.value = '';
    cardImageLinkInput.value = '';
    closePopup(evt);
}

newCardForm.addEventListener('submit', newCardFormSubmitHandler);