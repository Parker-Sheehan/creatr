import React, { useEffect, useState, useContext } from "react";
import styles from "./Messages.module.css";
import io from "socket.io-client";
import Card from "../ui/Card";
import AuthContext from "../../store/AuthContext";
import ChatRoom from "./ChatRoom";
const socket = io.connect("http://localhost:4000");

const Messages = () => {
  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState();
  const ctx = useContext(AuthContext);

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  const joinRoom = () => {};

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  const mapRooms = () => {
    let chatRoomArray = [... ctx.chatRooms]
    console.log(typeof [... chatRoomArray])
    chatRoomArray.map((room) => {
      return <ChatRoom key={room.id}/>;
    })
  }

  console.log(ctx.chatRooms)
  console.log(typeof ctx.chatRooms)

  return (
    <div className={styles.main}>
      {mapRooms()}
      {/* {ctx.chatRooms.map((room) => {
    return <ChatRoom key={room.id}/>;
  })} */}
      <div>
        <input
          type="text"
          placeholder="Message..."
          onChange={(evt) => {
            setMessage(evt.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default Messages;
