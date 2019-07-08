import axios from 'axios';
const URL = process.env.REACT_APP_API_URL

class Auth {
  constructor() {
    this.authenticated = false;
  }
  
  register(data) {
    return axios.post(`${URL}/signup/`, data)
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }
  
  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
  
export default new Auth();