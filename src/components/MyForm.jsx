import { useState } from "react"
import { socket } from "../../socket"

function MyForm({ room, username }) {
  const [message, setMessage] = useState("")

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

    socket.emit("chat message", {
      content: message,
      username,
      room
    })

    setMessage("")
  }

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>
    </div>
  )
}

export default MyForm;