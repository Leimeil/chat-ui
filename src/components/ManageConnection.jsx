import React from 'react'
import {socket} from "../../socket"

function ManageConnection() {
    const onConnect = () => {
      console.log("Conectado")
    }
    const onDisconnect = () => {
      console.log("Desconectado")
    }
    const handleConnection = (con) =>{
        switch (con){
            case "on":
                socket.connect
                break
            case "off":
                socket.disconnect
                break;
            default:
                break
        }
    };
  return (
    <div>
      <button onClick={()=> handleConnection("on")}>Connect</button>
      <button onClick={()=> handleConnection("off")}>Disconnect</button>
    </div>
  )
}

export default ManageConnection
