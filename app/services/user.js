// USER SERVICE //

import axios from 'axios';

const BASE_URL = '/api/v1/';

export default {
  checkIfStoredSession() {
    return axios.get(`${BASE_URL}session-check`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  register(registerInfo) {
    return axios.post(`${BASE_URL}signup`, registerInfo);
  },

  login(loginInfo) {
    return axios.post(`${BASE_URL}login`, loginInfo);
  },

  logout() {
    return axios.get('/logout');
  },
};
