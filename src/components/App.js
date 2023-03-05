import React from 'react';
import '../index.css'
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
// стейты попапов
  const [isOpenPopupAvatarEdit, setIsOpenPopupAvatarEdit] = React.useState(false);
  const [isOpenPopupProfile, setIsOpenPopupProfile] = React.useState(false);
  const [isOpenPopupAdd, setIsOpenPopupAdd] = React.useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = React.useState(false);

// стейт карточки в попапе с изображением и хендлер открытия
  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(props) {
    setSelectedCard(props);
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

  return (
    <div className="page page_container">
      <Header/>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        isOpen={isOpenPopupAvatarEdit}
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="edit-avatar"
        children={
          <label className="popup__form-field">
            <input type="url" name="link" id="src-input" placeholder="Ссылка на изображение" className="popup__input popup__input_type_link" defaultValue="" required/>
            <span className="popup__form-input-error src-input-error"></span>
          </label>}
        buttonName="Сохранить"
      />
      <PopupWithForm
        isOpen={isOpenPopupProfile}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        name="edit-avatar"
        children={
        <>
          <label className="popup__form-field">
            <input type="text" name="name" id="name-input" placeholder="Введите имя" className="popup__input popup__input_type_name" defaultValue="" minLength="2" maxLength="40" required/>
            <span className="popup__form-input-error name-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input type="text" name="job" id="job-input" placeholder="Введите описание" className="popup__input popup__input_type_info" defaultValue="" minLength="2" maxLength="200" required/>
            <span className="popup__form-input-error job-input-error"></span>
          </label>
        </>
          }
        buttonName="Сохранить"
      />
      <PopupWithForm
        isOpen={isOpenPopupAdd}
        onClose={closeAllPopups}
        title="Новое место"
        name="edit-avatar"
        children={
        <>
          <label className="popup__form-field">
            <input type="text" name="name" id="title-input" placeholder="Название"
                   className="popup__input popup__input_type_title" defaultValue="" minLength="2" maxLength="30" required/>
              <span className="popup__form-input-error title-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input type="url" name="link" id="link-input" placeholder="Ссылка на картинку"
                   className="popup__input popup__input_type_link" defaultValue="" required/>
              <span className="popup__form-input-error link-input-error"></span>
          </label>
        </>
        }
        buttonName="Создать"
      />
      <ImagePopup
        isOpen={isOpenImagePopup}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer/>
    </div>
  )
}

export default App;
