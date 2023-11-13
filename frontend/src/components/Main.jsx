import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addButton from '../images/add-button.svg';
import Card from './Card';
import Header from './Header';
import { api } from '../utils/Api';
import Footer from './Footer';
import  { setCurrentUser } from '../actions/currentUserActions';

function Main({
  setCards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,  
  onCardLike,
  onCardDelete,
}) {
  // Используйте useSelector для получения данных о пользователе из Redux

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Пытаемся получить данные из sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
  
    // Если данные есть, диспатчим их в Redux
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setCurrentUser(userData));
    } else {
      // Иначе делаем запрос к серверу
      api.getUserInfo()
        .then((userData) => {
          dispatch(setCurrentUser(userData));
          sessionStorage.setItem('currentUser', JSON.stringify(userData));
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных пользователя:', error);
        });
    }
  
    // Получаем и диспатчим карточки
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке карточек:', error);
      });
  }, []);
  
  
  return (
    <>
      <Header linkTo="/sign-in" linkName="Выйти" email={currentUser.email}/>
      <section className="profile">
        <div className="profile__avatar-container" src={`url(${currentUser.avatar})` }>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          <button type="button" className="button profile__avatar-edit-icon" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button type="button" className="button profile__info-edit-button" onClick={onEditProfile}></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="button profile__add-button" onClick={onAddPlace}>
          <img className="profile__add-button-image" src={addButton} alt="плюс" />
        </button>
      </section>
      <section  className="elements">
        {cards.slice().reverse().map((card) => (
          <Card key={card._id} card={card} handleClick={onCardClick}  handleLikeClick ={onCardLike} handleDeleteClick={onCardDelete}/>  
        ))}
      </section>
      <Footer />
    </>
  );
}

export default Main;
