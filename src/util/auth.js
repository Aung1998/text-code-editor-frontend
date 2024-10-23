import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {loginSuccess, logoutSuccess} from "../reducers/authSlice";
import {getFileSuccess} from "../reducers/codeFilesSlice";
import {loadPomodoroSuccess, revertPomodoroSuccess} from "../reducers/pomodoroSlice";

export const getCSRF = async () => {
  const cookie = new Cookies()
  try{
    const res = await axios.get(`${process.env.BACKEND_URL}/api/csrf`)
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
    const url = `${process.env.BACKEND_URL}/api/account/login`
    const res = await axios.post(url, body, config)
    if (res.data.success){
      store.dispatch(loginSuccess(res.data))
      store.dispatch(getFileSuccess(res.data.code_files))
      store.dispatch(loadPomodoroSuccess(res.data.pomodoro_setting))
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
  try {
    console.log("Logging out...")
    const url = `${process.env.BACKEND_URL}/api/account/logout`
    console.log(url)
    const res = await axios.post(url, config)
    if (res.data.success){
      store.dispatch(logoutSuccess())
      store.dispatch(getFileSuccess([]))
      store.dispatch(revertPomodoroSuccess())
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
    const url = `${process.env.BACKEND_URL}/api/account/signup`
    console.log(url)
    const res = await axios.post(url, body, config)
    if (res.data.success){
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}