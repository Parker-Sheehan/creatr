import React, { useEffect, useState, useContext } from "react";
import styles from "./Messages.module.css";
import io from "socket.io-client";
import Card from "../ui/Card";
import AuthContext from "../../store/AuthContext";
import ChatRoom from "./ChatRoom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { async } from "@firebase/util";
const socket = io.connect("http://localhost:4000");

const Messages = () => {
  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState();
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState();
  const [messagesArray, setMessagesArray] = useState([]);
  const ctx = useContext(AuthContext);

  const sendMessage = async () => {
    let userId = localStorage.getItem("id");
    let bodyObj = {
      token: localStorage.getItem("token"),
      message,
      room,
      userId,
    };
    await socket.emit("send_message", { message, room, userId });

    const messages = await axios.post("/sendMessage", bodyObj);
    console.log(messages.data);
    setMessagesArray(messages.data);
  };

  useEffect(() => {
    console.log('in useEffect')

  }, [messageReceived, room]);

  socket.on("receive_message", (data) => {

    console.log(data.message)
    console.log("WUuUUUUUUuuUuuUuuUuuuuuuuuUUUUUW")

    const messagesArrayHandler = async() => {
      let bodyObj = {
        token: localStorage.getItem("token"),
        room: data.room
      };
      const messages = await axios.post("/getMessage", bodyObj);
      console.log("++++++++++++++++++++++++++++++++++++")
      console.log(messages.data);
      setMessagesArray(messages.data);
    }


    setMessageReceived(data.message);
    messagesArrayHandler()
  });



  const mapRooms = () => {
    let chatRoomArray = [...ctx.chatRooms];
    chatRoomArray.map((room) => {
      return <ChatRoom key={room.id} />;
    });
  };

  const inRoomHandler = async(roomId) => {
    console.log(roomId);
    setInRoom(!inRoom);
    setRoom(roomId);
    socket.emit("join_room", roomId);

    let bodyObj = {
      token: localStorage.getItem("token"),
      room: roomId
    };

      const messages = await axios.post("/getMessage", bodyObj);
      console.log(messages.data);
      setMessagesArray(messages.data);
  
      // handleSetMessagesArray()
  };

  if (!inRoom) {
    return (
      <div className={styles.main}>
        <h2>Chat Rooms</h2>
        {ctx.chatRooms.map((room) => {
          return (
            <ChatRoom
              inRoomHandler={inRoomHandler}
              info={room}
              id={room.id}
              key={room.id}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div style={{ alignSelf: "start" }}>
      <IoArrowBack
        onClick={() => {
          setInRoom(!inRoom);
        }}
        size={30}
      />
      </div>
      {messagesArray.map((message) => {
        if (message.user_id == localStorage.getItem("id")) {
          return (<>
            <div className={styles.MyMessage}>
              <p>{message.message}</p>
            </div>
            </>
          );
        } else {
          return (
            <div className={styles.TheirMessage}>
              <h6>their</h6>

              <p>{message.message}</p>
            </div>
          );
        }
      })}
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
