import { authApiConfig } from '../utils/constants';
import { getToken, setToken } from './TokenHelper';

export class AuthApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _updateHeaders() {
    return {
      ...this.headers,
      'Authorization': `Bearer ${getToken()}`,
    };
  }

  async getUserInfo() {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return Promise.reject('Токен отсутствует');
  }

  const res = await fetch(`${this.url}/users/me`, {
    method: 'GET',
    headers: this._updateHeaders(),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

  // Метод для регистрации пользователя
  async register(email, password) {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({ password, email }),
    });
    return this._checkResponse(res);
  }

  // Метод для авторизации пользователя
  async login(email, password) {
    const res = await fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({ email, password }),
    });
  
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      return data.token; // Возвращаем токен из успешного ответа сервера
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  

  // Метод для проверки валидности токена
  async checkToken(token) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return this._checkResponse(res);
  }

  // Метод для проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}


export const authApi = new AuthApi(authApiConfig);
