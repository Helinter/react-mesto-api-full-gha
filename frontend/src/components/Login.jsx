import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from "./AuthApi"; 
import Header from './Header';
import { setToken } from "./TokenHelper";
import { setCurrentUser } from '../actions/currentUserActions'; // Импортируем действие для обновления текущего пользователя

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); // Используем useDispatch для доступа к диспатчу Redux

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      console.error('Email и пароль обязательны');
      return;
    }
  
    try {
      const response = await authApi.login(email, password);
  
      const data = await authApi.getUserInfo();
      
      console.log('Data before dispatch:', data);
  
      if (data && data.email) {
        dispatch(setCurrentUser(data));
        
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        setToken(response); 
        navigate('/');
      } else {
        console.error('Email пользователя не найден. Данные пользователя:', data);
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };
  
  
  return (
    <>
    <Header linkTo="/sign-up" linkName="зарегистрироваться" email=" " />
    <div className="sign-in">
      <h2 className="sign-in__header">Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          className="sign-in__input"
          minLength="2"
          maxLength="30"
          type="text"
          name="formSignInEmail"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="sign-in__input"
          minLength="2"
          maxLength="30"
          type="password" 
          name="formSignInPassword"
          placeholder="Пароль"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="sign-in__button" id="SignInSubmit">
          Войти
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;
