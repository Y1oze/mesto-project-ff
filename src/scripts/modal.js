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
