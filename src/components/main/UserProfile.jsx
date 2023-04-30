import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "../main/Profile.module.css";

const UserProfile= () => {
  const [loading, setLoading] = useState(true);
  const [profileArray, setProfileArray] = useState([])



  useEffect(() => {

    const fetchData = async () => {
      const bodyObj = {
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      };
      const data = await axios.post("/userProfile", bodyObj)
      console.log(data)
      setProfileArray(data.data)
      setLoading(false)
    }

    fetchData()
    
  }, []);

  console.log(profileArray)


  return (
    <div>
    {loading ? <h2>Loading!</h2>:
    <div className={styles.main}>

      
    <div className={styles.profile}>

      <div
        style={{
          backgroundImage:
            `URL("${profileArray.photo}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "50%",
          backgroundPositionY: "50%",
        }}
        className={styles.pfp}
      >
        <h1>{profileArray.name}</h1>
      </div>
      <div className={styles.bio}>
        <p>{profileArray.bio}</p>
      </div>
    </div>
  </div>}
    </div>
  );
};

export default UserProfile;
