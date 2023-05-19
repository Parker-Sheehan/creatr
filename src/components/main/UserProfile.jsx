import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../main/Profile.module.css";

const UserProfile= () => {
  const [loading, setLoading] = useState(true);
  const [profileArray, setProfileArray] = useState([])
  const navigate = useNavigate()



  useEffect(() => {

    const fetchData = async () => {
      const bodyObj = {
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      };
      const data = await axios.post("/userProfile", bodyObj)
      setProfileArray(data.data)
      setLoading(false)
    }

    fetchData()
    
  }, []);



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
    <button onClick={() => {
      navigate('/editprofile')
    }}>Edit</button>
  </div>}
    </div>
  );
};

export default UserProfile;
