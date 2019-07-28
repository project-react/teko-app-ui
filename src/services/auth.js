import axios from 'axios';
const URL = process.env.REACT_APP_API_URL_USERS;
const AURL = process.env.REACT_APP_API_URL_ADMIN; 

class Auth {
  constructor() {
    this.authenticated = false;
  }

  register(data) {
    return axios.post(`${URL}/register/`, data);
  }

  login(data) {
    this.authenticated = true; 
    return axios.post(`${URL}/login/`, data); 
  }

  logout(token) {
    this.authenticated = false;
    console.log(token)
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
        // this.authenticated = true; 
        return true; 
      }
      else {
        // this.authenticated = false;
        return false; 
      }
    }
    else {
      if(path === '/login' || path === '/register' || path === '/resetPassword'){
        // this.authenticated = false; 
        return false; 
      }
      else {
        if(path !== '/admin'){
          // this.authenticated = true;
          return true; 
        }
        else{
          this.verifyAdmin(localStorage.getItem('token'))
          .then(() => {
            return true
          })
          .catch(() => {
            return false 
          })
        }
      }
    }
  }
}

export default new Auth();