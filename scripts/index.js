const profilePopup = document.querySelector('#profile-pop-up');
const newCardPopup = document.querySelector('#add-card-pop-up');
const editProfileButton = document.querySelector('.profile-info__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('#profile-form');
const newCardForm = document.querySelector('#card-form');
const cardsContainer = document.querySelector('.elements__list');
const imagePreviewPopup = document.querySelector('#preview-pop-up');
const previewImage = document.querySelector('.pop-up__image-preview');
const previewName = document.querySelector('.pop-up__image-heading');
const profileJob = document.querySelector('.profile-info__description');
const nameInput = document.querySelector('#profile-name-input');
const profileName = document.querySelector('.profile-info__name');
const jobInput = document.querySelector('.pop-up__input_type_job');
const cardNameInput = document.querySelector('#card-name-input');
const cardImageLinkInput = document.querySelector('.pop-up__input_type_image-link');
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');

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
        openPopup(imagePreviewPopup);
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
    const button = popup.querySelector(validationConfig.submitButtonSelector);

    popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', closePopupOnEsc);
    disableSubmitButton(button);  //чтобы при открытии кнопка была неактивной
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(profilePopup);
}

function openNewCardPopup() {
    openPopup(newCardPopup);
}


//Закрытие поп-апов
function closePopup(popup) {
    popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {     //нажатие на esc
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.pop-up_opened');
        closePopup(popup);
    };
}

function closePopupOnOverlayOrButton(evt) {     //клик на оверлей или кнопку закрытия
    if (evt.target.classList.contains('pop-up') || evt.target.classList.contains('pop-up__close-button')) {
        const popup = document.querySelector('.pop-up_opened');
        closePopup(popup);
    };
}

//Установить слушатели на закрытие поп-апов
function setClosePopupListeners() {
    const popupList = Array.from(document.querySelectorAll('.pop-up'));

    popupList.forEach((popup) => {
        popup.addEventListener('mousedown', closePopupOnOverlayOrButton);
    });
}

//Резет формы в поп-апе
function formReset(popup) {
    if (popup.querySelector('.pop-up__form') !== null) {
        const form = popup.querySelector('.pop-up__form');
        form.reset();
    };
}

//Кнопка "Сохранить" для редактирования профиля
function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(profilePopup);
    formReset(profilePopup);
}


//Кнопка "Создать" для новой карточки
function newCardFormSubmitHandler(evt) {
    evt.preventDefault();

    const newcard = {
        name: cardNameInput.value,
        link: cardImageLinkInput.value
    };

    addCard(newcard);
    closePopup(newCardPopup);
    formReset(newCardPopup);
}


//Обработчики событий

//открыть поп-ап
editProfileButton.addEventListener('click', openProfilePopup);
addCardButton.addEventListener('click', openNewCardPopup);

//закрыть поп-ап
setClosePopupListeners();

//отправить форму
profileForm.addEventListener('submit', profileFormSubmitHandler);
newCardForm.addEventListener('submit', newCardFormSubmitHandler);

//Добавление дефолтных карточек
initialCards.forEach((card) => addCard(card))