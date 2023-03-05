import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <button type="button" className="popup__close popup__close_big-image" onClick={onClose}></button>
        <img className="popup__image" src={card ? card.link : ""} alt="изображение"/>
          <p className="popup__title-image">{card ? card.name : ""}</p>
      </div>
    </div>
  )
}
export default ImagePopup;