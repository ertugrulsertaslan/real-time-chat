import { useState } from "react";
import "./App.css";
import Room from "./Components/Room.jsx";
import io from "socket.io-client";
import Chat from "./Components/Chat.jsx";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      ) : (
        <Chat username={username} socket={socket} room={room} />
      )}
    </div>
  );
}

export default App;
