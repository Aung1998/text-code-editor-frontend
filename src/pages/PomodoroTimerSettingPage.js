import {useState} from "react";
import {useSelector} from "react-redux";
import {
  Box,
  FormControl,
  Heading, HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField, NumberInputStepper, Text
} from "@chakra-ui/react";
import {NumInput} from "../components/NumInput";

export const PomodoroTimerSettingPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [pomodoroTimer, setPomodoroTimer] = useState({})

  if (!isAuthenticated) {
    return <Heading>Please Login to your account first before configuring Pomodoro Timer</Heading>
  }

  return (
    <div>
      <Heading>
        Pomodoro Timer Setting
      </Heading>
      <Box maxW={'md'}>
        <NumInput label={"Focus Minutes"} />
        <NumInput label={"Short Break Minutes"} />
        <NumInput label={"Long Break Minutes"}/>
        <NumInput label={"Interval"}/>
      </Box>
    </div>
  )
}