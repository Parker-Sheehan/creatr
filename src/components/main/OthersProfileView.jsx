import React, {useState} from "react";
import { useParams } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";
import styles from "./Main.module.css"
import Messages from "./Messages";
import OtherProfile from "./OtherProfile";

const OthersProfileView = () => {
    let params = useParams()
    console.log(params)




  return (
    <div className={styles.main}>
      <SettingsMenu/>
      <OtherProfile params={params.params} />
      <Messages/>
    </div>
  );
};

export default OthersProfileView;
