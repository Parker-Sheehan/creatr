import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";

import styles from "./Profile.module.css";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileArray, setProfileArray] = useState([]);
  const [enableRedo, setEnableRedo] = useState(false)
  const [previosProfile, setPreviousProfile] = useState({})

  const ctx = useContext(AuthContext)

  useEffect(() => {
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
      setLoading(false);
    };

    fetchData();
  }, []);

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
            {profileArray.length === 0 && <h2>No more profiles</h2>}
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
              No
            </button>
            <button disabled={!enableRedo} onClick={previousProfileHandler}>Go Back</button>
            <button disabled={profileArray.length === 0} onClick={rightHandler}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
