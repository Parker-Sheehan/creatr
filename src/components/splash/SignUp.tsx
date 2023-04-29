import React, { useState } from "react";
import styles from "./GetStarted.module.css";
import axios from "axios";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = (props: any) => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

  const {
    input: nameInput,
    isValid: nameIsValid,
    hasError: nameHasError,
    setInputHandler: setNameInputHandler,
    setTouchedHandler: setNameTouchedHandler,
    reset: resetName,
  } = useForm((input: string) => input.trim() !== "");

  const {
    input: emailInput,
    isValid: emailIsValid,
    hasError: emailHasError,
    setInputHandler: setEmailInputHandler,
    setTouchedHandler: setEmailTouchedHandler,
    reset: resetEmail,
  } = useForm((input: string) => input.trim() !== "" && input.includes("@"));

  const {
    input: passInput,
    isValid: passIsValid,
    hasError: passHasError,
    setInputHandler: setPassInputHandler,
    setTouchedHandler: setPassTouchedHandler,
    reset: resetPass,
  } = useForm((input: string) => input.trim() !== "" && input.length >= 8);

  const {
    input: conPassInput,
    isValid: conPassIsValid,
    hasError: conPassHasError,
    setInputHandler: setConPassInputHandler,
    setTouchedHandler: setConPassTouchedHandler,
    reset: resetConPass,
  } = useForm(
    (input: string) =>
      input.trim() !== "" && input.length >= 8 && input === passInput
  );

  const resetSignUp = () => {
    resetName();
    resetEmail();
    resetPass();
    resetConPass();
  };

  const signUpSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setLoadingHandler(true);
    const newAccObj: { name: string; email: string; password: string} = {
      name: nameInput,
      email: emailInput,
      password: passInput,
    };
    console.log(newAccObj);

    axios.post("/signUp", newAccObj).then((data) => {
      console.log(data.data);
      let {exp, token, userId, bio, photo_added} = data.data
      authCtx.login(token, exp, userId, bio, photo_added)
      resetSignUp();
      navigate("/AddAccountInfo")
    })
    .catch((err)=> {
      console.log(err.response.data)
      setErrorMessage(err.response.data)
    })
    props.setLoadingHandler(false);
  };
  console.log(errorMessage)

  const signUpAllValid =
    emailIsValid && passIsValid && conPassIsValid && nameIsValid;

  const nameInputClasses = nameHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const emailInputClasses = emailHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const passInputClasses = passHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const conPassInputClasses = conPassHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const signUpSubmitButtonClasses = signUpAllValid ? styles.btn : styles.btnW;

  return (
    <div className={styles.sub_card}>
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={signUpSubmitHandler} action="">
        <div className={nameInputClasses}>
          <label>First Name: </label>
          <input
            type="text"
            id="name"
            value={nameInput}
            onChange={setNameInputHandler}
            onBlur={setNameTouchedHandler}
          />
          {nameHasError && (
            <p style={{ color: "#aa0b20" }}>A valid name must be entered</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label>Email: </label>
          <input
            type="email"
            id="email"
            value={emailInput}
            onChange={setEmailInputHandler}
            onBlur={setEmailTouchedHandler}
          />
          {emailHasError && (
            <p style={{ color: "#aa0b20" }}>A valid email must be entered</p>
          )}
        </div>
        <div className={passInputClasses}>
          <label>Password: </label>
          <input
            type="password"
            id="pass"
            value={passInput}
            onChange={setPassInputHandler}
            onBlur={setPassTouchedHandler}
          />
          {passHasError && (
            <p style={{ color: "#aa0b20" }}>A valid password must be entered</p>
          )}
        </div>
        <div className={conPassInputClasses}>
          <label>Confirm Password: </label>
          <input
            type="password"
            id="conPass"
            value={conPassInput}
            onChange={setConPassInputHandler}
            onBlur={setConPassTouchedHandler}
          />
          {conPassHasError && (
            <p style={{ color: "#aa0b20" }}>
              Passwords must be valid and match
            </p>
          )}
        </div>
        <button
          className={signUpSubmitButtonClasses}
          disabled={!signUpAllValid}
        >
          Sign Up
        </button>
      </form>
      <div>
      {errorMessage && <p> {errorMessage}</p>}
      </div>
      <a
        onClick={() => {
          props.setLogInHandler();

          resetSignUp();
        }}

      >
        to log in
      </a>
    </div>
  );
};

export default SignUp;
