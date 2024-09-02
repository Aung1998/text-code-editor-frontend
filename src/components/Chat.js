import {useSelector} from "react-redux";
import {Code, StackItem, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";


export const Chat = ({username, message}) => {
  const user = useSelector((state) => state.auth.user)
  const [bgColour, setBgColour] = useState('blue')

  useEffect(() => {
    if(username === user.username) {
      setBgColour('gray.100')
    } else{
      setBgColour('blue.200')
    }
  }, [user.username, username]);

  return (
    <VStack bgColor={bgColour} gap={1}>
      <StackItem>
        <Text>{username}</Text>
      </StackItem>
      <StackItem alignItems={'flex-start'}>
        {message.includes("python")?
          <Code bgColor={bgColour} textAlign='left' whiteSpace='pre-line'>
            {message.replace("```", "").replace("```", "").replace('python', "")}
          </Code>
          :
          <Text textAlign='left' whiteSpace="pre-line">{message}</Text>
        }
      </StackItem>
    </VStack>
  )
}