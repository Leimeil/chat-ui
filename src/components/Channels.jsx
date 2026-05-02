import React, { useState } from 'react'
import { socket } from "../../socket"

const ROOMS = ["General", "Tech Talk", "Random", "Gaming"]

function Channels({ setRoom, setUsername, username }) {
  const [activeRoom, setActiveRoom] = useState(null)

  const handleRoomSelect = (room) => {
    console.log(`Joining room: ${room}`)
    setActiveRoom(room)
    setRoom(room)
    
    socket.emit("join room", { username, room })
  }

  const handleLeaveRoom = () => {
    if (activeRoom) {
      console.log(`Leaving room: ${activeRoom}`)
      
      socket.emit("leave room", { room: activeRoom })
      
      setActiveRoom(null)
      setRoom(null)
      setUsername("")
    }
  }

  return (
    <div className="panel-container">
      <h3>Canales</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {ROOMS.map((room) => (
          <div key={room} className="channel-row">
            <button
              className={`btn-channel ${activeRoom === room ? 'active' : ''}`}
              onClick={() => handleRoomSelect(room)}
            >
              # {room}
            </button>
          </div>
        ))}
      </div>
      
      {activeRoom && (
        <button className="btn-leave" onClick={handleLeaveRoom}>
          Salir del canal
        </button>
      )}
    </div>
  )
}

export default Channels


