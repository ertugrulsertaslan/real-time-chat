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
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    if (message.trim() === "") {
      return;
    }
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: formattedTime,
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
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 p-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-1/3 bg-white shadow-xl flex flex-col justify-between rounded-l">
        <div className="w-full h-[600px] overflow-y-auto mt-3">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                className={`${
                  username === msg.username ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`${
                    username === msg.username
                      ? "bg-customBlue rounded-br-none text-white"
                      : "bg-customMessage rounded-bl-none text-black"
                  } w-max h-full p-3  text-sm m-2 rounded-xl text-pretty break-all `}
                >
                  {username === msg.username ? (
                    <p></p>
                  ) : (
                    <p className={`${msg.randomChatColor} font-bold`}>
                      {msg.username === ""
                        ? `Guest-${generateRandomName()}`
                        : msg.username}
                    </p>
                  )}
                  <div className="w-[190px]">{msg.message}</div>
                  <div>
                    <div
                      className={`${
                        username === msg.username
                          ? "justify-end"
                          : "justify-end"
                      } flex text-xs justify-end`}
                    >
                      <p>{msg.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-row items-center justify-start bg-zinc-300">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-10 mt-5 rounded-l p-2 ml-4 mb-4 text-xs"
            placeholder="Type you message..."
            type="text"
          />

          <div
            onClick={sendMessage}
            className="ml-3 mr-3 mt-5 font-bold text-green-500 cursor-pointer rounded-xl bg-gray-800 p-2 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
