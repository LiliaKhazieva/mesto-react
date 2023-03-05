import React from 'react';
import api from '../utils/api'
import Card from './Card'

function Main({ onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick,
              }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserAvatar(user.avatar);
        setUserDescription(user.about);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
            <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return(
              <Card key={card._id} card={card} onCardClick={onCardClick}/>
            )
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;