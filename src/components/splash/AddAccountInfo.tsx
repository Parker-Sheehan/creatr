import React from "react";
import styles from "./AddAccountInfo.module.css";
import useForm from "../../hooks/useForm";
import axios from "axios";

const AddAccountInfo = () => {
  const {
    input: textAreaInput,
    isValid: textAreaIsValid,
    hasError: textAreaHasError,
    setInputHandler: textAreaInputHandler,
    setTouchedHandler: textAreaTouchedHandler,
    reset: resetTextArea,
  } = useForm((input: string) => input.trim() !== "");

  const {
    input: fileInput,
    isValid: fileIsValid,
    hasError: fileHasError,
    setInputHandler: fileInputHandler,
    setTouchedHandler: fileTouchedHandler,
    reset: resetFile,
  } = useForm((input: string) => input.trim() !== "");

  const addInfoAllValid = textAreaIsValid && fileIsValid;

  const textAreaInputClasses = textAreaHasError
    ? `${styles.textarea} ${styles.invalid}`
    : styles.textarea;

  const fileInputClasses = fileHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const addInfoSubmitButtonClasses = addInfoAllValid ? styles.btn : styles.btnW;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(fileInput)

    const uploadObj = {
      token: localStorage.getItem('token'),
      image: fileInput,
      bio: textAreaInput
    }

    axios.put(`/addInfo/${localStorage.getItem('id')}`, uploadObj)
        .then((data) => {
          console.log(data.data)
        })
        .catch(err => console.log(err))


    resetTextArea()
    resetFile()

  };

  return (
    <form onSubmit={submitHandler} className={styles.main}>
      <h1>Show your style</h1>
      {/* <label htmlFor="file" className={styles.fileUp}>Upload an Image</label> */}
      <div>
        <input
          type="file"
          name="file"
          placeholder="add an Image"
          className={fileInputClasses}
          id="file"
          value={fileInput}
          onChange={fileInputHandler}
          onBlur={fileTouchedHandler}
          accept="image/*"
        />
        {fileHasError && (
          <p style={{ color: "#aa0b20" }}>A valid image must be added</p>
        )}
      </div>
      <h1>Preach your passion</h1>
      <div>
        <textarea
          className={textAreaInputClasses}
          id="text"
          value={textAreaInput}
          onChange={textAreaInputHandler}
          onBlur={textAreaTouchedHandler}
          placeholder="Tell us about your self..."
        ></textarea>
        {textAreaHasError && (
          <p style={{ color: "#aa0b20" }}>A bio must be added</p>
        )}
      </div>
      <button
        className={addInfoSubmitButtonClasses}
        disabled={!addInfoAllValid}
      >
        Submit
      </button>
    </form>
  );
};

export default AddAccountInfo;
