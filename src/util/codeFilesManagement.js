import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {createFileSuccess, deleteFileSuccess, getFileSuccess, updateFileSuccess} from "../reducers/codeFilesSlice";

export const createFile = async ({name, code}) => {
  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers:{
      'Content-Type': 'application/json'
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
      store.dispatch(createFileSuccess(res.data.code_file))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export const updateFile = async ({id, name, code, modified_date=Date.now(), created_date}) => {
  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers:{
      'Content-Type': 'application/json',
    },
    mode: "same-origin"
  }
  const body = JSON.stringify({id, name, code, modified_date, created_date})
  try {
    const url = `http://localhost:8000/api/codefiles/save/${id}`
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

export const deleteFile = async (id) => {

  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials = true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers: {
      'Content-Type': 'application/json'
    },
    mode: "same-origin"
  }

  const body = JSON.stringify(id)

  try {
    const url = `http://localhost:8000/api/codefiles/delete/${id}`
    const res = await axios.delete(url, body, config)
    if (res.data.success) {
      store.dispatch(deleteFileSuccess(id))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export const getFiles = async () => {
  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers:{
      'Content-Type': 'application/json'
    },
    mode: "same-origin"
  }

  try {
    const url = 'http://localhost:8000/api/codefiles'
    const res = await axios.get(url, config)
    if (res.data.success){
      store.dispatch(getFileSuccess(res.data.code_files))
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export const getOutput =async ({code, codeInput = ""}) => {
  const cookie = new Cookies()
  const csrf = cookie.get('csrftoken')

  axios.defaults.withCredentials=true;
  axios.defaults.credentials = 'same-origin';
  axios.defaults.headers.common["X-CSRFToken"] = csrf;

  const config = {
    'Access-Control-Allow-Credentials': true,
    headers:{
      'Content-Type': 'application/json'
    },
    mode: "same-origin"
  }

  const body = JSON.stringify({code, codeInput})

  try {
    const url = `http://localhost:8000/api/codefiles/execute`
    const res = await axios.post(url, body, config)
    if (res.data.success){
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
  return {success: false}
}