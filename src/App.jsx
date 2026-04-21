import { useEffect } from 'react'
import './App.css'
import { socket } from '../socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from "./components/Channels"
import Users from './components/Users'
import Chats from './components/Chats'

function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log("Conectado")
    }
    const onDisconnect = () => {
      console.log("Desconectado")
    }
    socket.on('connect', onConnect)
    socket.off('disconnect', onDisconnect)

  }, [])
 
  return (
    <>
      <h1>Chatify</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "100vh"}}>
        <Channels />
        <div style={{width: "200px", height: "300px", border: "4px solid black",display: "flex", justifyContent: "center",alignItems:"flex-end", flexDirection: "column"}}>
          <Chats/>
        <ManageConnection />
        <MyForm />
        </div>
        <Users/>
      </div>
    </>
  )
}

export default App