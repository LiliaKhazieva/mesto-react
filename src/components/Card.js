import React from 'react';

function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
      <li className="elements__item">
        <img src={card.link} alt={card.name} onClick={handleCardClick} className="elements__image"/>
          <button type="button" className="elements__delete-button"></button>
          <div className="elements__wrapper">
            <h2 className="elements__title">{card.name}</h2>
            <div className="elements__wrapper-like">
              <button type="button" className="elements__like-button"></button>
              <span className="elements__count">{card.likes.length}</span>
            </div>
          </div>
      </li>
  )
}
export default Card;