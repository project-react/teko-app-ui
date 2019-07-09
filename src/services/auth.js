import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

class Auth {
  constructor() {
    this.authenticated = false;
  }

  register(data) {
    return axios.post(`${URL}/signup/`, data);
  }

  login(data) {
    this.authenticated = true; 
    return axios.post(`${URL}/login/`, data); 
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  resetPassword(data) {
    return axios.post(`${URL}/resetpassword/`, data); 
  }
  
  setAuthenticated(value) {
    this.authenticated = value;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
