import React, { useEffect, useState } from "react";

const Chat = ({ username = "Guest", room, socket, randomChatColor }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
      randomChatColor,
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  const generateRandomName = () => {
    const length = 6;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/5 h-[600px] bg-zinc-400 flex flex-col justify-between">
        <div className="bg-green-500 h-10 p-2">
          <p className="text-white font-bold">Welcome To Chat Room</p>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                className={`${
                  username === msg.username ? "flex justify-end" : ":"
                }`}
              >
                <div
                  className={`${
                    username === msg.username
                      ? "bg-green-600"
                      : msg.randomChatColor
                  } w-2/3 h-12 p-2 text-white text-sm m-2 rounded-xl rounded-br-none`}
                >
                  <div>{msg.message}</div>
                  <div className="w-full flex justify-end text-xs">
                    {msg.username === ""
                      ? `Guest-${generateRandomName()}`
                      : msg.username}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-row items-center justify-start mb-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-72 h-10 mt-5 rounded-xl p-2 ml-4"
            placeholder="Message"
            type="text"
          />
          <button
            onClick={sendMessage}
            className="ml-5 font-bold h-5 text-2xl text-green-500 cursor-pointer rounded-xl"
          >
            <img
              className="border p-2 rounded-xl bg-white"
              src="./arrow-25-24.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
