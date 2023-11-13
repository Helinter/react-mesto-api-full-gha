import { apiConfig } from './constants';
import { getToken } from '../components/TokenHelper';

export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  // Метод для проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для обновления заголовков с токеном
  _updateHeaders() {
    return {
      ...this.headers,
      'Authorization': `Bearer ${getToken()}`,
    };
  }
  

  // Метод для получения карточек с сервера
  async getCards() {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      return Promise.reject('Токен отсутствует');
    }
    const res = await fetch(`${this.url}/cards`, {
      headers: this._updateHeaders(),
    });
    return this._checkResponse(res);
  }

  // Метод для добавления новой карточки на сервер
  async addCard(name, link) {
    const res = await fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this._updateHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    return this._checkResponse(res);
  }

  // Метод для обновления информации о пользователе на сервере
  async updateProfile(name, about) {
   
    const res = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this._updateHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    });

    const data = await this._checkResponse(res);
    return data;
  }

  // Метод для получения информации о пользователе с сервера
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

  // Метод для удаления карточки с сервера
  async deleteCard(cardId) {
   
    const res = await fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._updateHeaders(),
    });
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    const res = await fetch(`${this.url}/cards/${cardId}/likes`, {
      method,
      headers: this._updateHeaders(),
    });
    return this._checkResponse(res);
  }

  async updateAvatar(avatarLink) {
    const res = await fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._updateHeaders(),
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
    return this._checkResponse(res);
  }
}

export const api = new Api(apiConfig);
