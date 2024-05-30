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
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-1/3 bg-white shadow-xl flex flex-col justify-between rounded-l">
        <div className="w-full h-[600px] overflow-y-auto mt-3">
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="font-custom text-3xl text-customBlue">Username</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-1/2 h-10 mt-5 rounded-xl p-5 border-blue-300 focus:border-blue-500 border-2 focus:outline-none"
              placeholder="Username"
              type="text"
            ></input>
            <h2 className="mt-10 font-custom text-3xl text-customBlue">Room</h2>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className=" w-1/2 h-10 mt-5 rounded-xl p-5 border-blue-300 focus:border-blue-500 border-2 focus:outline-none"
              placeholder="Room"
              type="text"
            ></input>
            <button
              onClick={handleClick}
              className="mt-20 h-10 text-3xl text-green-500 cursor-pointer rounded-xl name font-custom"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Room;
