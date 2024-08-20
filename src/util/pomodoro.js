import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {updateFileSuccess} from "../reducers/codeFilesSlice";


export const updatePomodoro = async (pomodoro) => {
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
  const body = JSON.stringify(pomodoro)
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
}