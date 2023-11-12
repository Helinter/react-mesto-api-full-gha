import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');


  useEffect(() => {
    if (!isOpen) {
      // При закрытии попапа сбрасываем значения инпутов
      setPlaceName('');
      setPlaceLink('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: placeName, link: placeLink });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="placeForm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <span id="formPlace-error" className="error"></span>
      <input
        className="popup__input popup__input_type_place"
        minLength="2"
        maxLength="30"
        type="text"
        name="formPlace"
        placeholder="Название"
        required
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
      />
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="formLink"
        placeholder="Ссылка на картинку"
        required
        value={placeLink}
        onChange={(e) => setPlaceLink(e.target.value)}
      />
      <span id="formLink-error" className="error"></span>
      
    </PopupWithForm>
  );
}
