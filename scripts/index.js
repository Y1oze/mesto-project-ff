// @todo: Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove(); // Удаляем карточку
}

// @todo: Функция создания карточки
function createCard(data, deleteCardCallback) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  // Заполняем данные в карточке
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Добавляем обработчик для кнопки удаления
  cardDeleteButton.addEventListener("click", () =>
    deleteCardCallback(cardElement)
  );

  return cardElement;
}

// @todo: Вывести карточки на страницу
function renderCards() {
  const placesList = document.querySelector(".places__list");

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
}

// Вызов функции отображения карточек
renderCards();
