import React, { useEffect, useState, useContext } from "react";
import styles from "./Messages.module.css";
import Card from "../ui/Card";
import AuthContext from "../../store/AuthContext";
import ChatRoom from "./ChatRoom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import io from "socket.io-client";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:4000");

const Messages = () => {
  const [message, setMessage] = useState();
  const [messageReceived, setMessageReceived] = useState();
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState();
  const [messagesArray, setMessagesArray] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  const sendMessage = async () => {
    let userId = localStorage.getItem("id");
    let bodyObj = {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      message,
      room,
      userId,
    };
    await socket.emit("send_message", { message, room, userId });

    const messages = await axios.post("/sendMessage", bodyObj);
    console.log(messages.data);
    setMessagesArray(messages.data);
  };


  socket.on("receive_message", (data) => {
    console.log(data.message);
    console.log("WUuUUUUUUuuUuuUuuUuuuuuuuuUUUUUW");

    const messagesArrayHandler = async () => {
      let bodyObj = {
        token: localStorage.getItem("token"),
        room: data.room,
      };
      const messages = await axios.post("/getMessage", bodyObj);
      console.log("++++++++++++++++++++++++++++++++++++");
      console.log(messages.data);
      setMessagesArray(messages.data);
    };
    console.log("yoyo");

    messagesArrayHandler();
    setMessageReceived(data.message);
  });

  // console.log({... ctx.chatRooms.arrOfChatRooms[0], ...ctx.chatRooms.arrOfPfp[0]});



  const inRoomHandler = async (roomId) => {
    console.log(roomId);
    setInRoom(!inRoom);
    setRoom(roomId.id);
    socket.emit("join_room", roomId.id);

    let bodyObj = {
      token: localStorage.getItem("token"),
      room: roomId.id,
    };

    const messages = await axios.post("/getMessage", bodyObj);
    console.log(messages.data);
    setMessagesArray(messages.data);
    setRoomInfo({ pfp: roomId.pfp, id: roomId.id, name: roomId.name });

    // handleSetMessagesArray()
  };

  if (!inRoom) {
    return (
      <div className={styles.main}>
        <h2>Chat Rooms</h2>
        {ctx.chatRooms.map((room) => {
          // const otherName = room.name
          console.log(room.user_1_name);
          return (
            <ChatRoom
              inRoomHandler={inRoomHandler}
              info={room}
              id={room.id}
              key={room.id}
              pfp={room.photo_added}
              name={
                room.user_1_name === localStorage.getItem("name")
                  ? room.user_2_name
                  : room.user_1_name
              }
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div
        style={{
          alignSelf: "start",
          display: "flex",
          justifyContent: "space-between",
          width: "20vw",
        }}
      >
        <IoArrowBack
          onClick={() => {
            setInRoom(!inRoom);
          }}
          size={30}
          style={{ alignSelf: "flex-start" }}
        />
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundImage: `URL("${roomInfo.pfp}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "50%",
              backgroundPositionY: "50%",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
              marginRight: "10px",
            }}
            onClick={() => {
              console.log(roomInfo)
              navigate(`/otherProfile/${roomInfo.id}+${roomInfo.name}`);
            }}
          ></div>
          <h2 style={{ textAlign: "center" }}>{roomInfo.name}</h2>
        </div>
        <div></div>
      </div>
      {messagesArray.map((message) => {
        if (message.user_id == localStorage.getItem("id")) {
          return (
            <>
              <h6
                style={{
                  color: "white",
                  alignSelf: "flex-end",
                  margin: "5px",
                }}
              >
                {message.name}
              </h6>
              <div className={styles.MyMessage}>
                <p>{message.message}</p>
              </div>
            </>
          );
        } else {
          return (
            <>
              <h6
                style={{
                  color: "white",
                  alignSelf: "flex-start",
                  margin: "5px",
                }}
              >
                {message.name}
              </h6>
              <div className={styles.TheirMessage}>
                <p>{message.message}</p>
              </div>
            </>
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
