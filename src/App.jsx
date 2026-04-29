import { useEffect } from 'react'
import './App.css'
import { socket } from '../socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from "./components/Channels"
import Users from './components/Users'
import Chats from './components/Chats'
import { useState } from 'react'

function App() {
  const [room, setRoom] = useState(null)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const onConnect = () => {
      console.log("Conectado")
    }
    const onDisconnect = () => {
      console.log("Desconectado")
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

  }, [])
 
  return (
    <>
      <h1>Chatify</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "100vh"}}>
        <Channels setRoom={setRoom} setUsername={setUsername}/>
        <div style={{width: "200px", height: "300px", border: "4px solid black",display: "flex", justifyContent: "center",alignItems:"flex-end", flexDirection: "column"}}>
          <Chats/>
        <ManageConnection />
        <MyForm room={room} username={username} />
        </div>
        <Users/>
      </div>
    </>
  )
}

export default App