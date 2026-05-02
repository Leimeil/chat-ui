import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from "./components/Channels"
import Users from './components/Users'
import Chats from './components/Chats'

function App() {
  const [room, setRoom] = useState(null)
  const [usernameInput, setUsernameInput] = useState("")
  
  const [roomUsernames, setRoomUsernames] = useState({})

  const currentUser = room ? roomUsernames[room] : null

  useEffect(() => {
    const onConnect = () => console.log("✓ Socket conectado")
    const onDisconnect = () => console.log("✗ Socket desconectado")
    
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  useEffect(() => {
    if (room && currentUser) {
      const timer = setTimeout(() => {
        socket.emit("join room", { username: currentUser, room })
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [room, currentUser])

  const handleSetUsername = () => {
    if (usernameInput.trim() !== "") {
      const newName = usernameInput.trim();
      
      setRoomUsernames(prev => ({ ...prev, [room]: newName }));
      setUsernameInput("")
      
    } else {
      alert("Por favor ingresa un nombre de usuario válido")
    }
  }
 
  return (
    <>
      <h1>Chatify</h1>
      {room && !currentUser ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <h2 className='title-spacing'>Ingresa tu nombre de usuario para {room}</h2>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSetUsername()}
              placeholder="Tu nombre..."
              autoFocus
              style={{
                padding: "10px",
                marginRight: "10px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-input)",
                color: "var(--text-main)"
              }}
            />
            <button
              onClick={handleSetUsername}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "6px",
                backgroundColor: "var(--accent-purple)",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      ) : room && currentUser ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", padding: "20px", minHeight: "100vh"}}>
          <Channels activeRoom={room} setRoom={setRoom} roomUsernames={roomUsernames} setRoomUsernames={setRoomUsernames}/>
          <div style={{width: "400px", display: "flex", flexDirection: "column"}}>
            <Chats currentUser={currentUser}/>
            <MyForm room={room} username={currentUser} />
          </div>
          <Users/>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", padding: "20px", minHeight: "100vh"}}>
          <Channels activeRoom={room} setRoom={setRoom} roomUsernames={roomUsernames} setRoomUsernames={setRoomUsernames}/>
          <div style={{textAlign: "center", marginTop: "50px"}}>
            <h2>Selecciona un canal para comenzar</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default App