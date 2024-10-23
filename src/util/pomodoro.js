import Cookies from "universal-cookie";
import axios from "axios";
import store from "../store";
import {updatePomodoroSuccess} from "../reducers/pomodoroSlice";


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
    const url = `${process.env.BACKEND_URL}/api/setting/pomodoro`
    const res = await axios.put(url, body, config)
    if (res.data.success){
      store.dispatch(updatePomodoroSuccess(res.data.pomodoro))
      return true
    }
  } catch (e) {
    console.log(e)
  }
}