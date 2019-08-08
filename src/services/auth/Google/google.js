import axios from 'axios';
const URLG = process.env.REACT_APP_API_URL_GOOGLE;

const login = (accessToken, data) => {
  const config = {
    headers: {
      Authorization: accessToken,
    }
  }
  return axios.post(`${URLG}/login/`, data, config)
}

export default {
  login, 
}