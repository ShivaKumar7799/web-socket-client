import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import Test from "./test";

const socket = io.connect("http://localhost:8080");

function App() {
  const [name, set_name] = useState("");
  const [room, set_room] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", room)
  }
  return (
    <div>
      <h3>join</h3>
      <input
        type="text"
        value={name}
        name="name"
        onChange={(event) => set_name(event.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="text"
        value={room}
        onChange={(event) => set_room(event.target.value)}
        placeholder="Enter Room No"
      />
      <button onClick={joinRoom} >Join Room</button>
      <Chat socket={socket} username={name} room={room} />
      <Test />
    </div>
  );
}

export default App;
