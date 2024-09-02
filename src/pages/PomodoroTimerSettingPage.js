import {useState} from "react";
import {useSelector} from "react-redux";
import {
  Box,
  FormControl,
  Heading, Flex, Button, AlertIcon, AlertTitle, AlertDescription, Alert
} from "@chakra-ui/react";
import {NumInput} from "../components/NumInput";
import {updatePomodoro} from "../util/pomodoro";
import {useNavigate} from "react-router-dom";

export const PomodoroTimerSettingPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const initialState = useSelector((state) => state.pomodoro)
  const initialPomodoro = initialState.pomodoro
  const [pomodoroTimer, setPomodoroTimer] = useState(initialPomodoro)
  const [alertHide, setAlertHide] = useState(true)

  const navigate = useNavigate()

  if (!isAuthenticated) {
    return <Heading>Please Login to your account first before configuring Pomodoro Timer</Heading>
  }

  function alertError(){
    let count = 0
    setAlertHide(false)
    const interval = setInterval(() => {
      count = count + 1
      if (count >= 5){
        clearInterval(interval)
        setAlertHide(true)
      }
    }, 1000)
  }

  const onClickHandle = () => {
    updatePomodoro(pomodoroTimer).then((respond) => {
      if (respond){
        navigate('/')
      }else{
        alertError()
      }
    })
  }

  return (
    <Flex gap={5} width="full" align="center" justifyContent="center">
      <Box>
        <Heading>
          Pomodoro Timer Setting
        </Heading>
        <Box maxW={'md'}>
          <FormControl>
            <NumInput initialNumber={initialPomodoro.working_minutes} onChange={(e) => {
              let temp = {...pomodoroTimer}
              temp.working_minutes = parseInt(e.target.value)
              setPomodoroTimer(temp)
            }} label={"Focus Minutes"} />
            <NumInput initialNumber={initialPomodoro.short_break_minutes} onChange={(e) => {
              let temp = {...pomodoroTimer}
              temp.short_break_minutes = parseInt(e.target.value)
              setPomodoroTimer(temp)
            }} label={"Short Break Minutes"} />
            <NumInput initialNumber={initialPomodoro.long_break_minutes} onChange={(e) => {
              let temp = {...pomodoroTimer}
              temp.long_break_minutes = parseInt(e.target.value)
              setPomodoroTimer(temp)
            }} label={"Long Break Minutes"}/>
            <NumInput initialNumber={initialPomodoro.intervals} onChange={(e) => {
              let temp = {...pomodoroTimer}
              temp.intervals = parseInt(e.target.value)
              setPomodoroTimer(temp)
            }} label={"Intervals"}/>
            <Box my={2}>
              <Button colorScheme={'blue'} onClick={onClickHandle}>Save Setting</Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
      <Alert hidden={alertHide} status='error'>
        <AlertIcon />
        <AlertTitle>Pomodoro Setting Configuration Failed!!</AlertTitle>
        <AlertDescription>{`Please check your connection!`}</AlertDescription>
      </Alert>
    </Flex>
  )
}