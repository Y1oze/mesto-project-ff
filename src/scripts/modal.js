// let openedPopup;
// let openedPopupButton;

// function openPopup(popup, popupButton) {
//   openedPopup = popup;
//   openedPopupButton = popupButton;
//   popup.classList.add("popup_is-opened");

//   if (popupButton) {
//     popupButton.addEventListener("click", handlePopupCloseButtonClick);
//   }
//   popup.addEventListener("click", handleOverlayClick);
//   document.addEventListener("keydown", handleEscKeyPress);
// }

// function handleOverlayClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(openedPopup, openedPopupButton);
//   }
// }

// function handleEscKeyPress(evt) {
//   if (evt.key === "Escape" && openedPopup) {
//     closePopup(openedPopup, openedPopupButton);
//   }
// }

// function handlePopupCloseButtonClick() {
//     closePopup(openedPopup, openedPopupButton);
// }

// function closePopup(popup, popupButton) {
//   popup.classList.remove("popup_is-opened");
//   if (popupButton) {
//     popupButton.removeEventListener("click", handlePopupCloseButtonClick);
//   }
//   popup.removeEventListener("click", handleOverlayClick);
//   document.removeEventListener("keydown", handleEscKeyPress);

//   openedPopup = undefined;
//   openedPopupButton = undefined;
// }

// export { openPopup, closePopup };

let openedPopup;

function openPopup(popup) {
  openedPopup = popup;
  popup.classList.add("popup_is-opened");

  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscKeyPress);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape" && openedPopup) {
    closePopup();
  }
}

function closePopup() {
  if (!openedPopup) return;

  openedPopup.classList.remove("popup_is-opened");
  openedPopup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscKeyPress);

  openedPopup = undefined;
}

export { openPopup, closePopup };