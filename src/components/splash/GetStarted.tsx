import React, { useState } from "react";
import Card from "../ui/Card";
import styles from "./GetStarted.module.css";
import useForm from "../../hooks/useForm";

const GetStarted = () => {
  const [action, setAction] = useState("");

  const {
    input: emailInput,
    isValid: emailIsValid,
    hasError: emailHasError,
    setInputHandler: setEmailInputHandler,
    setTouchedHandler: setEmailTouchedHandler,
    reset: resetEmail} = useForm((input : string) => input.trim() !== "")

  return (
    <Card>
      {action === "" && (
        <div className={styles.sub_card}>
          <h1>Get Started!</h1>
          <button className={styles.btn} onClick={() => setAction("signup")}>Sign up</button>
          <button className={styles.btn} onClick={() => setAction("login")}>
            Log in
          </button>
        </div>
      )}
      {action === "login" && (
        <div className={styles.sub_card}>
          <h1>Log in</h1>
          <form className={styles.form} action="">
            <div>
            <label>Email: </label>
            <input type="text" name="" id="" />
            </div>
            <div>
            <label>Password: </label>
            <input type="password" />
            </div>
            <button>Log In</button>
          </form>
          <a onClick={() => setAction("signup")}>to sign up</a>
        </div>
      )}
      {action === "signup" && (
        <div className={styles.sub_card}>
          <h1>Sign Up</h1>
          <form className={styles.form} action="">
          <div>
            <label>First Name: </label>
            <input type="text" name="" id="" />
            </div>
            <div>
            <label>Email: </label>
            <input type="text" name="" id="" />
            </div>
            <div>
            <label>Password: </label>
            <input type="password" />
            </div>
            <div>
            <label>Confirm Password: </label>
            <input type="password" />
            </div>
            <button>Sign Up</button>
          </form>
          <a onClick={() => setAction("login")}>to log in</a>
        </div>
      )}
    </Card>
  );
};

export default GetStarted;
