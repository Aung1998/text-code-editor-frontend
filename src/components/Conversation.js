import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Box, Button, HStack, Input, Stack, StackItem, Text, VStack} from "@chakra-ui/react";
import {Chat} from "./Chat";


export const Conversation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const [messagesHistory, setMessagesHistory] = useState([])
  const[message, setMessage] = useState('')
  const [chatServer, setChatServer] = useState(null)

  useEffect(() => {
      if (isAuthenticated) {
        const socket = new WebSocket('ws://localhost:8000/ws/chatbot')
        socket.onopen = () => {
          console.log("Connected")
          setChatServer(socket)
        }

        socket.onmessage = (event) => {
          const message_data = JSON.parse(event.data)
          const res = {
            username: "Chat Code Bot",
            message: message_data.response
          }
          console.log(res)

          setMessagesHistory((previous) => [...previous, res])
        }

        socket.onclose = () => {
          console.log("WebSocket close!")
        }

        socket.onerror = (error) => {
          console.error(error)
        }
      }
      if (chatServer && !isAuthenticated){
        chatServer.close(200,  "user logged out!")
        setChatServer(null)
      }
    },
    [isAuthenticated, messagesHistory]);

  if (!isAuthenticated){
    return <Text>User need to login before accessing to the Chatbot</Text>
  }

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <VStack>
        <StackItem minH={'388px'}>
          <Box>
            {messagesHistory.map((data, index) => (
              <Chat key={index} username={data.username} message={data.message} />))}
          </Box>
        </StackItem>
        <StackItem>
          <HStack>
            <Input value={message} onChange={(e)=>{
              setMessage(e.target.value)
            }}/>
            <Button onClick={()=> {
              if (chatServer) {
                const chat = {
                  username: user.username,
                  message: message
                }
                let chatList = messagesHistory
                chatList.push(chat)
                setMessagesHistory(chatList)
                chatServer.send(JSON.stringify(chat))
                setMessage("")
              }
            }}>Send</Button>
          </HStack>
        </StackItem>
      </VStack>
    </div>
  )
}