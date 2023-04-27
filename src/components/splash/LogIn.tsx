import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import styles from "./GetStarted.module.css";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const LogIn = (props: any) => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext) 

  const {
    input: logEmailInput,
    isValid: logEmailIsValid,
    hasError: logEmailHasError,
    setInputHandler: setlogEmailInputHandler,
    setTouchedHandler: setlogEmailTouchedHandler,
    reset: resetlogEmail,
  } = useForm((input: string) => input.trim() !== "" && input.includes("@"));

  const {
    input: logPassInput,
    isValid: logPassIsValid,
    hasError: logPassHasError,
    setInputHandler: setlogPassInputHandler,
    setTouchedHandler: setlogPassTouchedHandler,
    reset: resetlogPass,
  } = useForm((input: string) => input.trim() !== "" && input.length >= 8);

  const logInAllValid = logEmailIsValid && logPassIsValid;

  const logEmailInputClasses = logEmailHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const logPassInputClasses = logPassHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const logInSubmitButtonClasses = logInAllValid ? styles.btn : styles.btnW;

  const resetLogIn = () => {
    resetlogPass();
    resetlogEmail();
  };

  const logInSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setLoadingHandler(true);
    const newAccObj: { email: string; password: string} = {
      email: logEmailInput,
      password: logPassInput,
    };
    console.log(newAccObj);

    await axios.post("/logIn", newAccObj).then((data) => {
      console.log(data.data);
      let {exp, token, userId, bio, photo_added} = data.data
      authCtx.login(token, exp, userId, bio, photo_added)
    });

    resetLogIn();
    props.setLoadingHandler(false);
    navigate("/AddAccountInfo")
  };

  return (
    <div className={styles.sub_card}>
      <h1>Log in</h1>
      <form onSubmit={logInSubmitHandler} className={styles.form} action="">
        <div className={logEmailInputClasses}>
          <label>Email: </label>
          <input
            type="email"
            id="email"
            value={logEmailInput}
            onChange={setlogEmailInputHandler}
            onBlur={setlogEmailTouchedHandler}
          />
          {logEmailHasError && (
            <p style={{ color: "#aa0b20" }}>A valid email must be entered</p>
          )}
        </div>
        <div className={logPassInputClasses}>
          <label>Password: </label>
          <input
            type="password"
            id="password"
            value={logPassInput}
            onChange={setlogPassInputHandler}
            onBlur={setlogPassTouchedHandler}
          />
          {logPassHasError && (
            <p style={{ color: "#aa0b20" }}>A valid password must be entered</p>
          )}
        </div>
        <button className={logInSubmitButtonClasses} disabled={!logInAllValid}>
          Log In
        </button>
      </form>
      <a
        onClick={() => {
          props.setSignUpHandler();
          resetLogIn();
        }}
      >
        to sign up
      </a>
    </div>
  );
};

export default LogIn;
