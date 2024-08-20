import {Link as RouteLink} from "react-router-dom";
import {
  HStack,
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import Timer from "./PomodoroTimer";
import {useEffect, useState} from "react";
import PomodoroTimer from "./PomodoroTimer";

export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const pomodoroSetting = useSelector((state) => state.pomodoro)

  const [pomodoro, setPomodoro] = useState(pomodoroSetting)
  const [PomodoroTimerConmponent, setPomodoroTimerConmponent] = useState(()=>(PomodoroTimer))
  useEffect(() => {
    if(isAuthenticated){
      setPomodoro(pomodoroSetting)
      console.log(pomodoro)
      setPomodoroTimerConmponent(()=>(()=>{
        return <PomodoroTimerConmponent
        focus={pomodoro.working_minutes}
        longBreak={pomodoro.long_break_minutes}
        shortBreak={pomodoro.short_break_minutes}
        interval={pomodoro.intervals}/>}))
    }
    else{
      setPomodoroTimerConmponent(()=> PomodoroTimer)
    }
  }, [isAuthenticated, pomodoroSetting]);
  return (
    <HStack height="5em">
      <RouteLink to={'/'}>
        Editor
      </RouteLink>
      {isAuthenticated ?
        <RouteLink to={'/logout'}>
          Logout
        </RouteLink> :
        <RouteLink to={'/login'}>
          Login
        </RouteLink>
      }
      <RouteLink to={'/pomodoroSetting'}>
        Pomodoro Setting
      </RouteLink>
      <PomodoroTimerConmponent />
    </HStack>
  )
}