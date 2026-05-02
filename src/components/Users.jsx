import React, { useEffect, useState } from 'react'
import { socket } from "../../socket"

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("room users", (usersList) => {
      console.log("Room users received:", usersList)
      setUsers(usersList)
    })

    socket.on("user joined", ({ username }) => {
      console.log("User joined:", username)
      setUsers(prev => {
        if (!prev.includes(username)) {
          return [...prev, username]
        }
        return prev
      })
    })

    socket.on("user left", ({ username }) => {
      console.log("User left:", username)
      setUsers(prev => prev.filter(u => u !== username))
    })

    return () => {
      socket.off("room users")
      socket.off("user joined")
      socket.off("user left")
    }
  }, [])

  return (
    <div className="panel-container">
      <h3>Usuarios ({users.length})</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--accent-purple)", fontSize: "12px" }}>●</span> 
              {user}
            </div>
          ))
        ) : (
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No hay usuarios conectados
          </div>
        )}
      </div>
    </div>
  )
}

export default Users