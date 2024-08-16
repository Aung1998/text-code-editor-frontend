import store from "../store";
import {useSelector} from "react-redux";
import {logout} from "../util/auth";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const LogoutPage = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    logout().then((value)=>{
      navigate('/login')
    })
  }, [])
  return <></>
}