import React from 'react'

function Channels() {
  return (
    <div style={{ width: "200px", height: "300px", border: "4px solid black"}}>
      Channels
      <div style= {{display: "flex", gap: "80px", flexDirection: "column"}}>
        <div>MAIN SERVER</div>
        <div>ANNOUNCEMENTS</div>
      </div>
    </div>
  )
}

export default Channels
