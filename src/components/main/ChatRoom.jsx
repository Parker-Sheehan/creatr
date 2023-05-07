import React from "react";
import Card from "../ui/Card";
import styles from "./ChatRoom.module.css";
import io from "socket.io-client";
import { useState } from "react";
const socket = io.connect("http://localhost:4000");

const ChatRoom = (props) => {
  const [newMessageArray, setNewMessageArray] = useState([])
  const joinRoom = () => {
    console.log(props.info);
    console.log(props.id);
    props.inRoomHandler(props.id);
    let newArray = newMessageArray.filter((x) => {
      if(x !== props.id){
        return x
      }
    })
    setNewMessageArray(newArray)

  };

  socket.emit("join_room", props.id);
  socket.on("receive_message", (data) => {
    console.log(data)
    console.log(data.message);
    console.log("WUuUUUUUUuuUuuUuuUuuuuuuuuUUUUUW");
    // setNewMessage(true)
    setNewMessageArray((prev) => {
      return [...prev, data.room]
    })
  });
  console.log(newMessageArray)

  const name = () => {
    if (+localStorage.getItem("id") === props.info.user_1) {
      return <p>{props.info.user_2}</p>;
    } else {
      return <p>{props.info.user_1}</p>;
    }
  };

  return (
    <div className={newMessageArray.includes(props.id) ?  `${styles.innerCard} ${styles.newMessage}`: styles.innerCard } onClick={joinRoom}>
      <div
            style={{
              backgroundImage: `URL("${props.pfp}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "50%",
              backgroundPositionY: "50%",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
              marginRight: "10px",
            }}
          ></div>
      {props.name}
    </div>
  );
};

export default ChatRoom;
