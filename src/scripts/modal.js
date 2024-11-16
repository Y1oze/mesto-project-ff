export { appearPopup, disappearPopup };

let openedPopup;
let openedPopupButton;

function appearPopup(popup, popupButton) {
  openedPopup = popup;
  openedPopupButton = popupButton;
  popup.classList.add("popup_is-opened");

  if (popupButton) {
    popupButton.addEventListener("click", handlePopupCloseButtonClick);
  }
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscKeyPress);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    disappearPopup(openedPopup, openedPopupButton);
  }
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape" && openedPopup) {
    disappearPopup(openedPopup, openedPopupButton);
  }
}

function handlePopupCloseButtonClick() {
  disappearPopup(openedPopup, openedPopupButton);
}

function disappearPopup(popup, popupButton) {
  popup.classList.remove("popup_is-opened");
  if (popupButton) {
    popupButton.removeEventListener("click", handlePopupCloseButtonClick);
  }
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscKeyPress);

  openedPopup = undefined;
  openedPopupButton = undefined;
}
