import React, { useState } from "react";
import Card from "../ui/Card";
import styles from "./GetStarted.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const GetStarted = () => {
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  // const loggin = (token: string, exp:number, Id: number) => {
  //   localStorage.setItem("token", token)
  //   localStorage.setItem("exp", exp)

  // }

  const setSignUpHandler = () => {
    setAction('signup')
  }

  const setLogInHandler = () => {
    setAction('login')
  }

  const setLoadingHandler = (value: boolean) => {
    setLoading(value)
  }

  return (
    <Card>
      {loading && <p>Loading...</p>}
      {action === "" && (
        <div className={styles.sub_card}>
          <h1>Get Started!</h1>
          <button className={styles.btn} onClick={() => setAction("signup")}>
            Sign up
          </button>
          <button className={styles.btn} onClick={() => setAction("login")}>
            Log in
          </button>
        </div>
      )}
      {action === "login" && <LogIn setSignUpHandler={setSignUpHandler}  setLoadingHandler={setLoadingHandler}/>}
      {action === "signup" && <SignUp setLogInHandler={setLogInHandler}  setLoadingHandler={setLoadingHandler}/>}
    </Card>
  );
};

export default GetStarted;
