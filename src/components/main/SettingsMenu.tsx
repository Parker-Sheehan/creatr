import React from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import styles from "./SettingsMenu.module.css";
import { TfiMenu } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { SlWrench } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";
import {BiLogOut} from "react-icons/bi"


const SettingsMenu = () => {
  const [show, setShow] = useState(false);

  const authCtx = useContext(AuthContext) 

  const logoutHandler = () => {
    authCtx.logout()
  }


  const navClass = show ? "": styles.hidden

  return (
    <div className={styles.main}>
      <nav className={navClass}>
        <div>
          <TfiMenu
            onClick={() => setShow(!show)}
            className={styles.icon}
            size={25}
          />
        </div>
        <div className={styles.edit} onClick={logoutHandler}>
          <h2>Log Out</h2>
          <BiLogOut size={25} className={styles.icon} />
        </div>
        <div className={styles.profile}>
          <h2>View Profile</h2>
          <CgProfile size={25} className={styles.icon} />
        </div>
        <div className={styles.delete}>
          <h2>Delete Profile</h2>
          <RiDeleteBin5Line size={25} className={styles.icon} />
        </div>
        
      </nav>
    </div>
  );
};

export default SettingsMenu;
