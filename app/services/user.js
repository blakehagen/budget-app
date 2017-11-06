// USER SERVICE //

import axios from 'axios';

const BASE_URL = '/api/v1/';

export default {

  getUser(userId) {
    return axios.get(`${BASE_URL}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  register(registerInfo) {
    return axios.post(`${BASE_URL}signup`, {
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      email: registerInfo.email,
      password: registerInfo.password,
    });
  },

  login(loginInfo) {
    return axios.post(`${BASE_URL}login`, {
      email: loginInfo.email,
      password: loginInfo.password,
    });
  },

  logout() {
    return axios.get('/logout');
  },
};
