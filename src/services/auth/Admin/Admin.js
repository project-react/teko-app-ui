import axios from 'axios';
const AURL = process.env.REACT_APP_API_URL_ADMIN; 

const loadListUser = (token) => {
  const data = {
    headers: {
      Authorization: token
    }
  }
  return axios.get(`${AURL}/getlistuser/`, data); 
}

const verify = (token) => {
  const data = {
    headers: {
      Authorization: token
    }
  }
  return axios.get(`${AURL}/isAdmin/`, data); 
}

const editInforUser = (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.put(`${AURL}/edituser/`, data, config);
}

const deleteUser = (dataDelete, token) => { 
  return axios.delete(
    `${AURL}/deleteuser/`,
    {
      headers: {
        Authorization: token,
      }, 
      data: dataDelete
    }, 
  ); 
}

const createAccount = (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.post(`${AURL}/createuser/`, data, config)
}

const lockAccount = (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    }
  }
  return axios.put(`${AURL}/lookaccount/`, data, config)
}

export default {
  loadListUser, 
  verify, 
  editInforUser, 
  deleteUser, 
  createAccount, 
  lockAccount, 
}