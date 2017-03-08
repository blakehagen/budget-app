// USER SERVICE //

import axios from 'axios';
const BASE_URL = '/api/v1/';

export default {

  login(loginInfo) {
    console.log('logging in...');
    return axios.post(`${BASE_URL}login`, {
      email: loginInfo.email,
      password: loginInfo.password
    });
  }
};