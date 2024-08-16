import {useEffect, useState} from "react";
import {Text} from "@chakra-ui/react";
const PomodoroTimer = ({focus=25, shortBreak=5, longBreak=30, interval=4}) => {
  const [sec, setSec] = useState(0)
  const [longBreakTime, setLongBreakTime] = useState(false)
  const [breakTime, setBreakTime] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(interval)
  const [minute, setMinute] = useState(focus)
  const [active, setActive] = useState(false)
  const [css, setCSS] = useState('bg-green-600')

  useEffect(()=> {
    if (active) {
      const countdown = setInterval(() => {
        if (sec > 0) {
          setSec(sec -1)
        }
        if (sec === 0){
          setMinute(minute -1)
          setSec(59)
        }
        if (minute===0 && sec === 0){
          if (breakTime===false){
            setBreakTime(true)
            setCSS('bg-orange-600')
            setMinute(shortBreak-1)

          }
          else if (longBreakTime){
            setMinute(focus-1)

            setLongBreakTime(false)
          }
          else{
            setBreakTime(false)
            setPomodoroCount(pomodoroCount-1)
            if(pomodoroCount === 0){
              setCSS('bg-red-600')
              console.log("Long break time!")
              setLongBreakTime(true)
              setMinute(longBreak-1)
              setPomodoroCount(interval)
            }
            else{
              setMinute(focus-1)

              setPomodoroCount(pomodoroCount-1)
            }
          }
        }
        return clearInterval(countdown)
      }, 1000)
    }
  }, [active, breakTime, focus, interval, longBreak, longBreakTime, minute, pomodoroCount, sec, shortBreak])

  const minuteText = minute>9? minute : '0' + minute
  const secondText = sec>9? sec : '0' + sec

  return (
    <div className={css} onClick={()=>setActive(!active)}>
      <Text>{minuteText+":"+secondText}</Text>
    </div>)
}
export default PomodoroTimer