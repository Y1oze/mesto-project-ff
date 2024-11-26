import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {
  clearValidation,
  enableValidation,
  setButtonState,
} from "./validation.js";

import {
  getInitialCards,
  getUserInfo,
  setUserInfo,
  addCardToApi,
  delereCardFromApi,
  likeCardToApi,
  dislikeCardToApi,
  setNewAvatar,
} from "./api.js";

// DOM
const cardContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupNewCardButton = document.querySelector(".profile__add-button");
const popupAvatarEditButton = document.querySelector(".avatar__edit-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupDeleteCard = document.querySelector(".popup_delete-card");
const popupAvatar = document.querySelector(".popup_new-avatar");

const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupDeleteCardButton = popupDeleteCard.querySelector(".popup__close");
const popupAvatarButton = popupAvatar.querySelector(".popup__close");

const image = document.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// Data
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const formDeleteCard = document.forms["confirm-delete"];
const formEditAvatar = document.forms["new-avatar"];

const profileNameInput = document.querySelector(".popup__input_type_name");
const profileJobInput = document.querySelector(
  ".popup__input_type_description"
);
const cardPlaceNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const avatar = formEditAvatar.elements.avatar;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

let userId;
let cardForDelete = {};
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.setAttribute("style", `background-image: url(${userData.avatar});`);

    cards.forEach((cardData) => {
      cardContainer.append(
        createCard(cardData, handleDeleteCard, handleLikeCard, openImage, userId)
      );
    });
  })
  .catch((err) => console.error(`Ошибка при загрузке начальных данных: ${err}`));

popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");

// Functions
function renderLoading(flag, popup) {
  const submitButton = popup.querySelector(".popup__button");
  
  if (!submitButton) {
    console.error("Submit button not found in popup");
    return;
  }

  if (flag) {
    setButtonState(submitButton, "popup__button_disabled");
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
}

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardPlaceNameInput.value,
    link: cardLinkInput.value,
  };

  const name = newCard.name;
  const link = newCard.link;

  addCardToApi(name, link)
    .then((res) => {
      cardContainer.prepend(
        createCard(res, handleDeleteCard, handleLikeCard, openImage)
      );
      closePopup();
    })
    .catch((err) => console.error(`Ошибка при добавлении карточки: ${err}`));

  cardForm.reset();
}

function populateProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function openImage(evt) {
  image.src = evt.srcElement.currentSrc;
  image.alt = evt.srcElement.alt;
  caption.textContent = evt.srcElement.alt;
  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEdit);
  setUserInfo(profileNameInput.value, profileJobInput.value)
    .then(() => {
      profileTitle.textContent = profileNameInput.value;
      profileDescription.textContent = profileJobInput.value;
      closePopup(popupEdit, popupEditCloseButton);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, popupEdit);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupNewCard);
  addCardToApi(cardPlaceNameInput.value, cardLinkInput.value)
    .then((res) => {
      cardContainer.prepend(
        createCard(res, handleDeleteCard, handleLikeCard, openImage, userId)
      );
      closePopup(popupNewCard, popupNewCardButton);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, popupNewCard);
    });
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  delereCardFromApi(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closePopup(popupDeleteCard, popupDeleteCardButton);
      cardForDelete = {};
    })
    .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`));
}
function handleEditAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  setNewAvatar(avatar.value)
    .then((res) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url(${res.avatar});`
      );
      closePopup(popupAvatar, popupAvatarButton);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      renderLoading(false, popupAvatar);
    });
}

function handleDeleteCard(cardId, cardElement) {
  cardForDelete = {
    id: cardId,
    cardElement,
  };

  openPopup(popupDeleteCard, popupDeleteCardButton);
}
function handleLikeCard(cardId, cardLike, likesNumber) {
  if (cardLike.classList.contains("card__like-button_is-active")) {
    dislikeCardToApi(cardId)
      .then((res) => {
        likesNumber.textContent = res.likes.length;
        cardLike.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.error(`Ошибка при снятии лайка: ${err}`));
  } else {
    likeCardToApi(cardId)
      .then((res) => {
        likesNumber.textContent = res.likes.length;
        cardLike.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.error(`Ошибка при добавлении лайка: ${err}`));
  }
}

function setInfoFromProfile() {
  if (!profileNameInput || !profileJobInput) {
    console.error("Поля ввода не найдены. Проверьте селекторы.");
    return;
  }

  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

// Event Listeners
profileForm.addEventListener("submit", updateProfileInfo);

profileEditButton.addEventListener("click", () => {
  populateProfileForm();
  openPopup(popupEdit, profileEditButton);
  clearValidation(profileForm, validationConfig);
  setInfoFromProfile();
});

popupNewCardButton.addEventListener("click", () => {
  openPopup(popupNewCard, popupNewCardButton);
  clearValidation(cardForm, validationConfig);
});
popupAvatarEditButton.addEventListener("click", (evt) => {
  openPopup(popupAvatar, popupAvatarButton);
  clearValidation(formEditAvatar, validationConfig);
});

const closeButtons = [
  popupEditCloseButton,
  popupNewCardCloseButton,
  popupImageCloseButton,
  popupAvatarButton,
];

// Close buttons
closeButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
formDeleteCard.addEventListener("submit", handleDeleteCardSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatar);
