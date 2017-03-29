// USER SERVICE //

import axios from 'axios';
const BASE_URL = '/api/v1/';

export default {

  getUser(userId) {
    console.log('getting user...here is my token: ', localStorage.getItem('token'));
    return axios.get(`${BASE_URL}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  register(registerInfo) {
    console.log('registering user...');
    return axios.post(`${BASE_URL}signup`, {
      firstName: registerInfo.firstName,
      lastName: registerInfo.lastName,
      email: registerInfo.email,
      password: registerInfo.password
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