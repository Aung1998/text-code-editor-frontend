import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {updateFileSuccess} from "../reducers/codeFilesSlice";

export const createFile = async ({name, code}) => {
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

  const date = new Date()

  const body = JSON.stringify({
    name,
    code,
    modified_date: date.toISOString(),
    created_date: date.toISOString()
  })
  console.log(body)
  try {
    const url = 'http://localhost:8000/api/codefiles/save'
    const res = await axios.post(url, body, config)
    if (res.data.success){
      store.dispatch(updateFileSuccess(res.data.code_files))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export const updateFile = async ({id, code}) => {
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
  const body = JSON.stringify({id, code})
  try {
    const url = `http://localhost:8000/api/codefiles/${id}`
    const res = await axios.put(url, body, config)
    if (res.data.success){
      store.dispatch(updateFileSuccess(res.data.code_files))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}