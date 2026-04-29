import React, { useEffect, useState } from 'react'
import {socket} from "../../socket"

const ROOMS = ["General", "Tech Talk", "Random", "Gaming"]

function Chats() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages(prev => [...prev, msg])
    })

    socket.on("chat history", (history) => {
      setMessages(history)
    })

    return () => {
      socket.off("chat message")
      socket.off("chat history")
    }
  }, [])

  return (
    <div style={{ width: "200px", height: "200px", border: "4px solid black", overflowY: "scroll"}}>
      {messages.map((m) => (
        <p key={m.id}>
          <strong>{m.username}:</strong> {m.content}
        </p>
      ))}
    </div>
  )
}

export default Chats
