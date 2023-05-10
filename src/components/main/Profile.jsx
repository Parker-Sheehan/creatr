import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {BsXCircle, BsRewindCircle, BsCheckCircle} from 'react-icons/bs'
import AuthContext from "../../store/AuthContext";
import io from "socket.io-client";
import Swal from "sweetalert2";



import styles from "./Profile.module.css";

const Profile = () => {
  const socket = io.connect("http://localhost:4000");
  const [loading, setLoading] = useState(true);
  const [profileArray, setProfileArray] = useState([]);
  const [enableRedo, setEnableRedo] = useState(false)
  const [previosProfile, setPreviousProfile] = useState({})

  const ctx = useContext(AuthContext)

  const fetchData = async () => {
    const bodyObj = {
      userId: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
    };
    const data = await axios.post("/profiles", bodyObj);
    setProfileArray(data.data);
    const chatRooms = await axios.post("/chatRoom", bodyObj);
    console.log(chatRooms)
    console.log(chatRooms.data)
    console.log(typeof chatRooms.data)
    ctx.chatRoomsArrayHandler(chatRooms.data)

    let room = `${localStorage.getItem("id")} ${localStorage.getItem('name')}`
    socket.emit("join_room", room);

    setLoading(false);
  };

  useEffect(() => {

    
    fetchData();
  }, []);
  

  socket.on("match_made", (data) => {
    console.log('yo')
    console.log(data)
    console.log(data.data)
    Swal.fire({
      title: 'New Match!',
      text: `you just matched with ${data}!`,
      confirmButtonText: 'Cool'
    })
    fetchData();

  });

  const rightHandler = async () => {
    const bodyObj = {
      userId: localStorage.getItem("id"),
      userName: localStorage.getItem("name"),
      otherUserId: profileArray[0].id,
      otherUserName: profileArray[0].name,
      token: localStorage.getItem("token"),
    };
    const data = await axios.post("/like", bodyObj);
    console.log(data)
    if(data.data !== 'yay'){
      ctx.chatRoomsArrayHandler(data.data)
    }
    let newArr = profileArray.slice(1);

    setProfileArray(newArr);
    setEnableRedo(false)
  };

  const leftHandler = async () => {
    const bodyObj = {
      userId: localStorage.getItem("id"),
      userName: localStorage.getItem("name"),
      otherUserId: profileArray[0].id,
      otherUserName: profileArray[0].name,
      token: localStorage.getItem("token"),
    };

    await axios.post("/dislike", bodyObj);
    setPreviousProfile(profileArray[0])
    let newArr = profileArray.slice(1);
    setProfileArray(newArr);
    setEnableRedo(true)
  };

  const previousProfileHandler = async () => {
    let newArr = profileArray;
    newArr.unshift(previosProfile)

    setProfileArray(newArr);
    setEnableRedo(false)
  };





  return (
    <div>

      {/* <p>{ctx.chatRooms}</p> */}
      {loading ? (
        <h2>Loading!</h2>
      ) : (
        <div className={styles.main}>
          <div className={styles.profile}>
            {profileArray.length === 0 && <h2 className={styles.NoMore}>No more profiles</h2>}
            {profileArray.length > 0 && (
              <div
                style={{
                  backgroundImage: `URL("${profileArray[0].photo}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionX: "50%",
                  backgroundPositionY: "50%",
                }}
                className={styles.pfp}
              >
                <h1>{profileArray[0].name}</h1>
              </div>
            )}
            {profileArray.length > 0 && (
              <div className={styles.bio}>
                <p>{profileArray[0].bio}</p>
              </div>
            )}
          </div>
          <div className={styles.btn_container}>
            <button disabled={profileArray.length === 0} onClick={leftHandler}>
              <BsXCircle size={80} color={'red'}/>
            </button>
            <button disabled={!enableRedo} onClick={previousProfileHandler}><BsRewindCircle size={80} color={'gold'}/></button>
            <button disabled={profileArray.length === 0} onClick={rightHandler}>
              <BsCheckCircle size={80} color={'lightgreen'}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
