import {useEffect, useState} from "react";
import {Button, HStack, Text} from "@chakra-ui/react";
const PomodoroTimer = ({focus=25, shortBreak=5, longBreak=30, interval=4}) => {
  const [sec, setSec] = useState(0)
  const [longBreakTime, setLongBreakTime] = useState(false)
  const [breakTime, setBreakTime] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(interval)
  const [minute, setMinute] = useState(focus)
  const [message, setMessage] = useState('Pomodoro Timer has not started yet')
  const [active, setActive] = useState(false)

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
        if (minute===0 && sec === 0 && !longBreakTime){
          if (!breakTime){
            setMinute(shortBreak-1)
            setMessage("Take a short break!")
            setPomodoroCount((pomodoroCount) => pomodoroCount - 1)
          }
          else{
            setMessage(()=>"Focus on your work!")
            setMinute(focus-1)
          }
          if (pomodoroCount===0){
            setLongBreakTime(true)
          }
          setBreakTime(!breakTime)
        }
        if (longBreakTime){
          setMessage(()=> "Take a long break!")
          setMinute(longBreak-1)
          setLongBreakTime(false)
          setPomodoroCount(interval)
        }
        return clearInterval(countdown)
      }, 1000)
    }
  }, [active, breakTime, focus, interval, longBreak, longBreakTime, minute, pomodoroCount, sec, shortBreak])

  const minuteText = minute>9? minute : '0' + minute
  const secondText = sec>9? sec : '0' + sec

  return (
    <HStack>
      <Text>{minuteText+":"+secondText} </Text>
      <Text>{message}</Text>
      <Button size={'md'} onClick={()=> {
        setActive(true)
        if(!breakTime) {
          setMessage("Focus time!")
        }
      }}>Start Pomodoro</Button>
      <Button size={'md'} onClick={()=> {
        setActive(false)
      }}>Pause Pomodoro</Button>
    </HStack>
  )
}
export default PomodoroTimer