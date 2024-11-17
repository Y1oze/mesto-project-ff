const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, deleteCard, likeCard, onImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", onImageClick);

  return cardElement;
}

function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
