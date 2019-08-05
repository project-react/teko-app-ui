import axios from 'axios';
const URL = process.env.REACT_APP_API_URL_USERS;

const register = (data) => {
  return axios.post(`${URL}/register/`, data);
}

const login = (data) => {
  return axios.post(`${URL}/login/`, data); 
}

const logout = (token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios.get(`${URL}/logout/`, config); 
}

const changePassword = (data) => {
  return axios.post(`${URL}/changePassword/`, data);
}

const resetPassword = (data) => {
  return axios.post(`${URL}/resetPassword/`, data); 
}

const loginWithGoogle = (access_token, data) => {
  const config = {
    headers: {
      Authorization: access_token,
    }
  }
  return axios.post(`${URL}/google/login`, data, config)
}

const isAuthenticated = (path) => {
  if(localStorage.getItem("username") === null) {
    if(path === '/login' || path === '/register' || path === '/resetPassword'){
      return true; 
    }
    else {
      return false; 
    }
  }
  else {
    if(path === '/login' || path === '/register' || path === '/resetPassword'){
      return false; 
    }
    else {
      return true;
    }
  }
}

export default {
  register, 
  login, 
  logout, 
  changePassword, 
  resetPassword, 
  loginWithGoogle, 
  isAuthenticated, 
}