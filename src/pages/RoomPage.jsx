import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";

const RoomPage = ({setRoom, setIsAuth}) => {


  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("token");
      setIsAuth(false);
    });
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    const roomName = e.target[0].value.toLowerCase().trim();
    setRoom(roomName);
  }



  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Write the name of the room you want to log in to</p>

      <input type="text" placeholder="Exp:weekdays" />
      <button type="submit">Login to the Room</button>
      <button type="button" onClick={handleLogout}>
        Exit
      </button>
    </form>
  );
};

export default RoomPage;
