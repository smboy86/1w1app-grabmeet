import axios from 'axios';
//http://supw.shop/user/login?nickname=sup&lastnumber=1234

export const axiosInstance = axios.create({
  // baseURL: 'http://supw.shop',
  baseURL: 'https://reqres.in',
  headers: { Authorization: `${'TOKEN'}` },
});
