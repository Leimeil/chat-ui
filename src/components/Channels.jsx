import { socket } from "../../socket"

const ROOMS = ["General", "Tech Talk", "Random", "Gaming"]

function Channels({ setRoom, setUsername }) {

  const getStoredUsers = () => {
    const data = localStorage.getItem("roomUsers")
    return data ? JSON.parse(data) : {}
  }

  const saveUser = (room, username) => {
    const users = getStoredUsers()
    users[room] = username
    localStorage.setItem("roomUsers", JSON.stringify(users))
  }

  const joinRoom = (room) => {
    const users = getStoredUsers()

    let user = users[room]

    // Si no existe username, pedirlo
    if (!user) {
      user = prompt("Tu nombre:")

      // Bloquear acceso si es inválido
      if (!user || user.trim() === "") {
        alert("Username inválido")
        return
      }

      saveUser(room, user)
    }

    setRoom(room)
    setUsername(user)

    socket.emit("join room", {
      username: user,
      room
    })
  }

  const leaveRoom = (room) => {
    socket.emit("leave room", { room })
  }

  return (
    <div style={{ width: "200px", height: "300px", border: "4px solid black" }}>
      
      <h3>Rooms</h3>

      {ROOMS.map(r => (
        <div key={r} style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
          
          {/* ENTRAR */}
          <button onClick={() => joinRoom(r)}>
            {r}
          </button>

          {/* SALIR */}
          <button onClick={() => leaveRoom(r)}>
            Leave
          </button>

        </div>
      ))}

    </div>
  )
}

export default Channels