import { useEffect, useState } from "react";
import "./App.css";
import Room from "./Components/Room.jsx";
import io from "socket.io-client";
import Chat from "./Components/Chat.jsx";

const socket = io.connect("http://localhost:5000");

const randomColor = () => {
  const colors = [
    "text-red-400",
    "text-blue-400",
    "text-green-400",
    "text-yellow-400",
    "text-purple-400",
    "text-pink-400",
    "text-indigo-400",
    "text-teal-400",
    "text-orange-400",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const randomChatColor = randomColor();

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [chatScreen, setChatScreen] = useState(false);

  useEffect(() => {
    socket.on("error", (error) => {
      setError(error);
    });
    socket.on("roomJoined", (data) => {
      setChatScreen(true);
    });
  }, []);

  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          socket={socket}
          error={error}
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
