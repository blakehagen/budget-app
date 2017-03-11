// USER SERVICE //

import axios from 'axios';
const BASE_URL = '/api/v1/';

export default {

  getUser(userId) {
    console.log('getting user...here is my token: ', sessionStorage.getItem('token'));
    return axios.get(`${BASE_URL}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  },

  login(loginInfo) {
    console.log('logging in...');
    return axios.post(`${BASE_URL}login`, {
      email: loginInfo.email,
      password: loginInfo.password
    });
  }
};