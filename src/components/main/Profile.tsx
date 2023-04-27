import React from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div
          style={{
            background:
              'URL("https://i.pinimg.com/736x/07/d3/d0/07d3d0ee23f40f71dd61411d6fe06f85.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionX: "50%",
            backgroundPositionY: "50%",
          }}
          className={styles.pfp}
        >
          <h1>Hayat, 22</h1>
        </div>
        <div className={styles.bio}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            necessitatibus modi facilis, dolor molestias maiores, unde laborum
            ipsa pariatur repudiandae libero adipisci, doloremque aut
            reprehenderit non. Pariatur exercitationem veniam minus! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Adipisci, distinctio
            unde. Nostrum aliquid corporis ullam cupiditate dolorum numquam unde
            iste inventore. Laudantium asperiores eaque quaerat vero excepturi
            autem laboriosam saepe?
          </p>
        </div>
        <div
          style={{
            background:
              'URL("https://i.pinimg.com/736x/07/d3/d0/07d3d0ee23f40f71dd61411d6fe06f85.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionX: "50%",
            backgroundPositionY: "50%",
          }}
          className={styles.pfp}
        ></div>
      </div>
      <div className={styles.btn_container}>
        <button>No</button>
        <button>Go Back</button>
        <button>Yes</button>
      </div>
    </div>
  );
};

export default Profile;
