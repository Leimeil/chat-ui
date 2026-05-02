import { useState, useEffect, useRef } from "react"
import { socket } from "../../socket"

function MyForm({ room, username }) {
  const [message, setMessage] = useState("")

  const [typingIndicator, setTypingIndicator] = useState(null)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    socket.on("user typing", ({ username: typingUser, isTyping }) => {
      if (isTyping) {
        setTypingIndicator(`${typingUser} está escribiendo...`)
      } else {
        setTypingIndicator(null)
      }
    })

    return () => socket.off("user typing")
  }, [])

  const handleChange = (e) => {
    setMessage(e.target.value)

    if (room && username) {
      socket.emit("typing", { username, room, isTyping: true })
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", { username, room, isTyping: false })
      }, 3000)
    }
  }


  
  const handleClick = (e) => {
    e.preventDefault()

    if (!room) {
      alert("Únete a un room primero")
      return
    }

    if (!username || username.trim() === "") {
      alert("Username inválido")
      return
    }


    console.log("Sending message:", { content: message, username, room })
    socket.emit("chat message", {
      content: message,
      username,
      room
    })

    setMessage("")

    socket.emit("typing", { username, room, isTyping: false })
    clearTimeout(typingTimeoutRef.current)
  }

  return (
    <div className="form-container">
      <div className="typing-text">
        {typingIndicator}
      </div>
      
      <form className="input-group" onSubmit={handleClick}>
        <input
          className="chat-input"
          value={message}
          onChange={handleChange}
          placeholder="Escribe un mensaje..."
        />
        <button className="btn-send" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default MyForm;