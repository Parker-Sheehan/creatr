import React, {useState} from "react";
import Profile from "./Profile";
import SettingsMenu from "./SettingsMenu";
import styles from "./Main.module.css"
import Messages from "./Messages";
import UserProfile from "./UserProfile";

const Main = () => {





  return (
    <div className={styles.main}>
      <SettingsMenu/>
      <UserProfile />
      <Messages/>
    </div>
  );
};

export default Main;
