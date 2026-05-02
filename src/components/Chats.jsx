import React, { useEffect, useState } from 'react'
import {socket} from "../../socket"

const ROOMS = ["General", "Tech Talk", "Random", "Gaming"]

function Chats({currentUser}) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages(prev => [...prev, msg])
    })

    socket.on("chat history", (history) => {
      console.log("Chat history received:", history)
      setMessages(history)
    })

    return () => {
      socket.off("chat message")
      socket.off("chat history")
    }
  }, [])

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-window">
      {messages && messages.length > 0 ? (
        messages.map((m, idx) => {
          const isMine = m.username === currentUser;
          
          return (
            <div key={m.id || idx} className={`message-bubble ${isMine ? 'sent' : 'received'}`}>
              <strong>{m.username}</strong>
              <div>{m.content}</div>
              <span className="timestamp">{formatTime(m.created_at)}</span>
            </div>
            
          )
        })
      ) : (
        <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "20px" }}>
          No hay mensajes aún
        </div>
      )}
    </div>
  )
}

export default Chats