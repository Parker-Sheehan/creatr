import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./Profile.module.css";

const Profile= () => {
  const [loading, setLoading] = useState(true);
  const [profileArray, setProfileArray] = useState([])


  useEffect(() => {

    const fetchData = async () => {
      const bodyObj = {
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      };
      const data = await axios.post("/profiles", bodyObj)
      setProfileArray(data.data)
      setLoading(false)
    }

    fetchData()
    
  }, []);

  console.log()
  // const setCurrentProfile = () => {

  // }


  const leftHandler = () => {
    console.log(profileArray)
    let newArr = profileArray.slice(1)
    setProfileArray(newArr)
  }


  return (
    <div>
    {loading ? <h2>Loading!</h2>:
    <div className={styles.main}>

      
    <div className={styles.profile}>

      <div
        style={{
          backgroundImage:
            `URL("${profileArray[0].photo}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "50%",
          backgroundPositionY: "50%",
        }}
        className={styles.pfp}
      >
        <h1>{profileArray[0].name}</h1>
      </div>
      <div className={styles.bio}>
        <p>{profileArray[0].bio}</p>
      </div>

      {/* <div
        style={{
          background:
            'URL("https://i.pinimg.com/736x/07/d3/d0/07d3d0ee23f40f71dd61411d6fe06f85.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "50%",
          backgroundPositionY: "50%",
        }}
        className={styles.pfp}
      ></div> */}
    </div>
    <div className={styles.btn_container}>
      <button onClick={leftHandler}>No</button>
      <button>Go Back</button>
      <button>Yes</button>
    </div>

  </div>}
    </div>
  );
};

export default Profile;
