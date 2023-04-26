import React, { useState } from "react";
import Card from "../ui/Card";
import styles from "./GetStarted.module.css";
import useForm from "../../hooks/useForm";
import axios from "axios";

const GetStarted = () => {
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);

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

  const resetLogIn = () => {
    resetlogPass();
    resetlogEmail();
  };

  const resetSignUp = () => {
    resetName();
    resetEmail();
    resetPass();
    resetConPass();
  };

  const signUpSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const newAccObj: { name: string; email: string; password: string } = {
      name: nameInput,
      email: emailInput,
      password: passInput,
    };
    console.log(newAccObj);

    axios.post("/signUp", newAccObj).then((data) => {
      console.log(data);
    });

    resetSignUp();
    setLoading(false);
  };

  const logInAllValid = logEmailIsValid && logPassIsValid;

  const logEmailInputClasses = logEmailHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const logPassInputClasses = logPassHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

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
  const logInSubmitButtonClasses = logInAllValid ? styles.btn : styles.btnW;

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
      {action === "login" && (
        <div className={styles.sub_card}>
          <h1>Log in</h1>
          <form className={styles.form} action="">
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
                <p style={{ color: "#aa0b20" }}>
                  A valid email must be entered
                </p>
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
                <p style={{ color: "#aa0b20" }}>
                  A valid password must be entered
                </p>
              )}
            </div>
            <button
              className={logInSubmitButtonClasses}
              disabled={!logInAllValid}
            >
              Log In
            </button>
          </form>
          <a
            onClick={() => {
              setAction("signup");
              resetLogIn();
            }}
          >
            to sign up
          </a>
        </div>
      )}
      {action === "signup" && (
        <div className={styles.sub_card}>
          <h1>Sign Up</h1>
          <form
            className={styles.form}
            onSubmit={signUpSubmitHandler}
            action=""
          >
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
                <p style={{ color: "#aa0b20" }}>
                  A valid email must be entered
                </p>
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
                <p style={{ color: "#aa0b20" }}>
                  A valid password must be entered
                </p>
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
          <a
            onClick={() => {
              setAction("login");
              resetSignUp();
            }}
          >
            to log in
          </a>
        </div>
      )}
    </Card>
  );
};

export default GetStarted;
