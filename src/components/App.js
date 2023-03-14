import React from 'react';
import '../index.css'
import api from '../utils/api'
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Card from '../components/Card'
import { CurrentUserContext}  from '../contexts/CurrentUserContext.js';

function App() {

// стейты попапов
  const [isOpenPopupAvatarEdit, setIsOpenPopupAvatarEdit] = React.useState(false);
  const [isOpenPopupProfile, setIsOpenPopupProfile] = React.useState(false);
  const [isOpenPopupAdd, setIsOpenPopupAdd] = React.useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: ''});
  const [cards, setCards] = React.useState([]);

  // стейт карточки
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
   }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenImagePopup(true)
  }

  //хендлер кнопки редактирования аватара
  function handleEditAvatarClick() {
    setIsOpenPopupAvatarEdit(true);
  }

  // хендлер кнопки редактирования профиля
  function handleEditProfileClick() {
    setIsOpenPopupProfile(true);
  }

  //хендлер кнопки добавления новой карточки
  function handleAddPlaceClick() {
    setIsOpenPopupAdd(true)
  }

  //хендлер закрытия всех попапов
  function closeAllPopups() {
    setIsOpenPopupAvatarEdit(false);
    setIsOpenPopupProfile(false);
    setIsOpenPopupAdd(false);
    setIsOpenImagePopup(false);
  }

  function handleCardLike(card) {
    // Проверяем повторно есть ли лайк на этой карточке у текущего юзера
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Запрос в API и получение данных карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.saveUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.saveUserAvatar(link.avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page_container">
            <Header/>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <EditAvatarPopup
              isOpen={isOpenPopupAvatarEdit}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            ></EditAvatarPopup>
            <EditProfilePopup
              isOpen={isOpenPopupProfile}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            ></EditProfilePopup>
            <AddPlacePopup
              isOpen={isOpenPopupAdd}
              onClose={closeAllPopups}
              onUpdateNewCard={handleAddPlaceSubmit}
            >
            </AddPlacePopup>
            <ImagePopup
              isOpen={isOpenImagePopup}
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <Footer/>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App;
