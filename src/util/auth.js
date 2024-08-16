import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {loginSuccess, logoutSuccess, registerSuccess} from "../reducers/authSlice";
import {getFileSuccess} from "../reducers/codeFilesSlice";

export const getCSRF = async () => {
  const cookie = new Cookies()
  try{
    const res = await axios.get('http://localhost:8000/api/csrf')
    return cookie.get('csrftoken')
  } catch(e){
    console.log(e)
  }
}

export const login = async ({username, password}) => {
  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers:{
      'Content-Type': 'application/json',
      'X-CSRFToken':csrf
    },
    mode: "same-origin"
  }
  const body = JSON.stringify({username, email:"", password})
  try {
    const url = `http://localhost:8000/api/account/login`
    const res = await axios.post(url, body, config)
    if (res.data.success){
      store.dispatch(loginSuccess(res.data))
      store.dispatch(getFileSuccess(res.data.code_files))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export const logout = async() => {
  const cookies = new Cookies()
  const csrf = cookies.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    headers:{
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    mode: "same-origin"
  }
  console.log("Logging out...")
  try {
    console.log("Logging out...")
    const url = `http://localhost:8000/api/account/logout`
    console.log(url)
    const res = await axios.post(url, config)
    if (res.data.success){
      console.log("Success!")
      store.dispatch(logoutSuccess())
      store.dispatch(getFileSuccess([]))
      return true
    }
  }
  catch (e){
    console.log(e)
  }
  return false
}
export const register =  async ({username, email, password}) => {
  const cookies = new Cookies()
  const csrf = cookies.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    headers:{
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    mode: "same-origin"
  };

  const body = JSON.stringify({username, email, password})
  try {
    const url = `http://localhost:8000/api/account/signup`
    console.log(url)
    const res = await axios.post(url, body, config)
    if (res.data.success){
      console.log("Success!")
      store.dispatch(registerSuccess())
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}