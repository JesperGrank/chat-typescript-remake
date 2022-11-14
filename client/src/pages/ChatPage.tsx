import { useEffect, useState } from 'react'
import { ChatMessage } from "@my-chat-app/shared"
import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

export default function HomePage() {

  const [chatMessage, setChatMessage] = useState<string>("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | undefined>("")
  
  const fetchMessages = async (): Promise<ChatMessage[]> => {
    const reponse = await axios.get<ChatMessage[]>("/")
    return reponse.data
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([])
        setError("Something went wrong when fetching messages...")
      })
    }, 2500)
  }, [])
  
  const createMessage = async (chatMessage: string): Promise<void> => {
    const username = localStorage.getItem("ts-webchat")
    const message: ChatMessage = {
      text: chatMessage,
      author: username,
      timeStamp: new Date()
    }
    try {
      const response = await axios.post<ChatMessage[]>("/", message)
      setMessages(response.data)
      setChatMessage("")
    } catch (error) {
      setMessages([])
      setError("Missing username or invalid message input")
    }

  }
  const output = () => {
    if (error) {
      return (<div>{error}</div>)
    } else if (messages) {
      return (<div>
        {messages && messages.map((singleMessage, index) => {
          return (
            <div className="chat-messages" key={index}>
              {singleMessage.author}: {singleMessage.text} <br />
              {singleMessage.timeStamp.toString().split('T')[0].substring(0, 10)} - {singleMessage.timeStamp.toString().split('T')[1].substring(0, 5)}
            </div>
          )
        })}
      </div>)
    } else {
      <div>'Something went wrong fetching messages...'</div>
    }
  }
  return (

    <div>
      <div className='selectName'>
      <input className="form-control" type="text" placeholder="Message" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
        <button className="btn-sub" onClick={(e) => createMessage(chatMessage)}>Send message</button>
      </div>
      
      {output()}


    </div>
  )
}
