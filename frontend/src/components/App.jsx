import React, { useState } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Modal from './Modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  { setCurrentUser } from '../actions/currentUserActions';



function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(''); // Путь к изображению

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  
  const handleUpdateAvatar = (newAvatar) => {
    api.updateAvatar(newAvatar)
      .then((updatedUser) => {
        dispatch(setCurrentUser(updatedUser));
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  }
  
  const handleUpdateUser = async ( name, about ) => {
    try {
      const res = await api.updateProfile(name, about);
      dispatch(setCurrentUser(res));
      sessionStorage.setItem('currentUser', JSON.stringify(res));
      // Добавляем callback для закрытия попапа после успешного обновления профиля
      closeAllPopups(() => {
        console.log('Popup closed after profile update');
      });
    } catch (error) {
      console.error('Ошибка при обновлении данных о пользователе:', error);
    }
  };
  

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
      
  }

  const handleDeleteClick = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        // Создаем новый массив, исключая удаленную карточку
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };



  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };


  // Обработчики для открытия/закрытия попапов
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };


  const handleAddPlaceSubmit = ({ name, link }) => {
    // Отправляем запрос на сервер для создания карточки
    api.addCard(name, link)
      .then((createdCard) => {
        // После успешного создания сервер вернет карточку с присвоенным _id
        setCards([...cards, createdCard]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при создании карточки:', error);
      });
  }



  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopupOpen(false);
  };
  

  return (


    <Router>
      <div className="page">

        <Routes>
          <Route path="/sign-up" element={<Register
            setIsRegistered={setIsRegistered}
            setImageSrc={setImageSrc}
            setError={setError}
          />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<ProtectedRouteElement element={Main}
            setCards={setCards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            closeAllPopups={closeAllPopups}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleLikeClick}
            onCardDelete={handleDeleteClick}
          />} />
        </Routes>

        <ImagePopup link={selectedCard?.link} name={selectedCard?.name} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm title="Вы уверены?" name="deleteForm" isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
          <button type="submit" className="popup__container-button popup__container-button_type_delete" id="deleteSubmit">Да</button>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {isRegistered && (
          <Modal
            message="Вы успешно зарегистрировались!"
            onClose={() => setIsRegistered(false)}
            imageSrc={imageSrc}
          />
        )}

        {error && (
          <Modal
            message="Что-то пошло не так! Попробуйте ещё раз."
            onClose={() => setError(null)}
            imageSrc={imageSrc}
          />
        )}


      </div>
    </Router>
  );
}

export default App;