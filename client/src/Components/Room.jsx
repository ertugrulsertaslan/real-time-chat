import React from "react";

const Room = ({
  username = `Guest`,
  room,
  setUsername,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const handleClick = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[500px] bg-zinc-500">
        <div className="text-center mt-5 font-bold text-emerald-500">
          Welcome To Chat
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="font-bold text-3xl">Username :</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-1/3 h-10 mt-5 rounded-xl p-1"
            placeholder="Username"
            type="text"
          ></input>
          <h2 className="mt-10 font-bold text-3xl">Room:</h2>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className=" w-1/3 h-10 mt-5 rounded-xl p-1"
            placeholder="Room"
            type="text"
          ></input>
          <button
            onClick={handleClick}
            className="mt-10 font-bold h-10 text-3xl text-green-500 cursor-pointer rounded-xl name"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};
export default Room;
