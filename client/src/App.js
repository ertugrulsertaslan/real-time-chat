import { useState } from "react";
import "./App.css";
import Room from "./Components/Room.jsx";
import io from "socket.io-client";
import Chat from "./Components/Chat.jsx";

const socket = io.connect("http://localhost:5000");

const randomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-orange-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const randomChatColor = randomColor();

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
        <Chat
          username={username}
          socket={socket}
          room={room}
          randomChatColor={randomChatColor}
        />
      )}
    </div>
  );
}

export default App;
