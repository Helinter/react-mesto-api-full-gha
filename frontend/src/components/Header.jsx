import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { removeToken } from './TokenHelper'; 

function Header({ linkTo, linkName }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  const email = sessionStorage.getItem('email');

  const handleLogout = () => {
    // При клике на ссылку, удаляем токен из sessionStorage
    removeToken();
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      {!isAuthPage && <p className="header__email">{email}</p>}
      <Link className="header__link" to={linkTo} onClick={handleLogout}>{linkName}</Link>
    </header>
  );
}

export default Header;
