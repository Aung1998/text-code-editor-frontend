import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export const Chat = ({username, message}) => {
  const user = useSelector((state) => state.auth.user)
  const [bgColour, setBgColour] = useState('bg-blue')

  if(username === user.username) {
    setBgColour('bg-gray-500')
  }


}