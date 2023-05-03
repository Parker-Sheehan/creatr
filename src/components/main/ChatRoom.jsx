import React from "react";
import Card from "../ui/Card";
import styles from "./ChatRoom.module.css";

const ChatRoom = (props) => {
  const joinRoom = () => {
    console.log(props.info)
    console.log(props.id);
    props.inRoomHandler(props.id)
  };

  const name = () => {
    if(+localStorage.getItem('id') === props.info.user_1){
        return <p>{props.info.user_2}</p>
    }else{
        return <p>{props.info.user_1}</p>
    }
  }

  return (
    <div className={styles.innerCard} onClick={joinRoom}>
        {name()}
    </div>
  );
};

export default ChatRoom;
