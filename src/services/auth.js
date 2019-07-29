import axios from 'axios';
const URL = process.env.REACT_APP_API_URL_USERS;
const AURL = process.env.REACT_APP_API_URL_ADMIN; 

class Auth {
  register(data) {
    return axios.post(`${URL}/register/`, data);
  }

  login(data) {
    return axios.post(`${URL}/login/`, data); 
  }

  logout(token) {
    const data = {
      headers: {
        Authorization: token
      }
    }
    return axios.get(`${URL}/logout/`, data); 
  }

  changePassword(data) {
    return axios.post(`${URL}/changePassword/`, data);
  }

  resetPassword(data) {
    return axios.post(`${URL}/resetPassword/`, data); 
  }
  
  adminLoadListUser(token) {
    const data = {
      headers: {
        Authorization: token
      }
    }
    return axios.get(`${AURL}/getlistuser/`, data); 
  }

  verifyAdmin(token) {
    const data = {
      headers: {
        Authorization: token
      }
    }
    return axios.get(`${AURL}/isAdmin/`, data); 
  }

  isAuthenticated(path) {
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
}

export default new Auth();