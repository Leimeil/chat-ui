import React, { useEffect, useState } from 'react'
import {socket} from "../../socket"

function Chats() {
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    socket.on("chat message", (msg) =>{
      console.log("Mensaje desde server:", msg);
      setMessage((prev) => [...prev, msg]);
    });
    return () =>{
      socket.off("chat message");
    } 
  }, []);

  return (
    <>
      <div style={{ width: "200px", height: "200px", border: "4px solid black"}}>Chat</div>
      {messages?.map((m) => (
        <p>{m}</p>
      ))}
    </>
  )
}

export default Chats
