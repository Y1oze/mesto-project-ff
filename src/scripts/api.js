export {
  getInitialCards,
  getUserInfo,
  setUserInfo,
  addCardToApi,
  delereCardFromApi,
  likeCardToApi,
  dislikeCardToApi,
  setNewAvatar,
};

const server = {
  adress: "https://nomoreparties.co/v1/wff-cohort-26/",
  token: "ff84996d-926f-4ee1-ab5f-bc0b66b93768",
};

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getInitialCards() {
  return fetch(`${server.adress}cards`, {
    method: "GET",
    headers: {
      authorization: server.token,
    },
  }).then((res) => {
    return getResponseData(res);
  });
}

function getUserInfo() {
  return fetch(`${server.adress}users/me`, {
    method: "GET",
    headers: {
      authorization: server.token,
    },
  }).then((res) => {
    return getResponseData(res);
  });
}

function setUserInfo(name, about) {
  return fetch(`${server.adress}users/me`, {
    method: "PATCH",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

function addCardToApi(name, link) {
  return fetch(`${server.adress}cards`, {
    method: "POST",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
      length: 0,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

function delereCardFromApi(CardId) {
  return fetch(`${server.adress}cards/${CardId}`, {
    method: "DELETE",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return getResponseData(res);
  });
}

function likeCardToApi(cardId) {
  return fetch(`${server.adress}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return getResponseData(res);
  });
}

function dislikeCardToApi(cardId) {
  return fetch(`${server.adress}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return getResponseData(res);
  });
}

function setNewAvatar(avatarLink) {
  return fetch(`${server.adress}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: server.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: `${avatarLink}`,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

/*
    token: 
      ff84996d-926f-4ee1-ab5f-bc0b66b93768
    cohort:
      wff-cohort-26
  */
