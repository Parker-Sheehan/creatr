import React, {useState} from "react";
import styles from "./AddAccountInfo.module.css";
import useForm from "../../hooks/useForm";
import axios from "axios";
import storage from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddAccountInfo = () => {
  let navigate = useNavigate()

  const [rawFiles, setRawFiles] = useState([]);
  const [images, setImages] = useState([]);

  const getLinks = async () => {
    const array = [];
    const files = [...rawFiles];
    console.log(files);
    for (const file of files) {
      try {
        const storageRef = await ref(
          storage,
          `/${localStorage.getItem('id')}/${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        array.push(url);
      } catch (err) {
        console.error(err);
      }
    }
    console.log(array);
    return Promise.allSettled(array);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getLinks()
      .then((imageArray) => {
        console.log(console.log(imageArray));
        let newArray = imageArray.map((i) => i.value);
        return newArray;
      })
      .then((urls) => {
        // My submit handler goes here

        console.log(urls[0]);

        const uploadObj = {
          token: localStorage.getItem('token'),
          image: urls[0],
          bio: textAreaInput
        }
    
        axios.put(`/addInfo/${localStorage.getItem('id')}`, uploadObj)
            .then((data) => {
              console.log(data.data)
              localStorage.setItem('bio', data.data.bio)
              localStorage.setItem('photo_added', data.data.photo_added)
              navigate("/")
            })
            .catch(err => console.log(err))
        // const bodyObj = {
        //   userId: userInfo.id,
        //   content: postref.current.value,
        //   images: urls,
        // };
        // axios
        //   .post("/api/newPost", bodyObj)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      });


  };

  const submitHandler = (event) => {
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

  console.log(images);

  const uploadMultipleFiles = (e) => {
    const raw = [];
    const newImages = [];
    setRawFiles(e.target.files);
    raw.push(e.target.files);
    for (let i = 0; i < raw[0].length; i++) {
      newImages.push(URL.createObjectURL(raw[0][i]));
    }
    setImages(newImages);
  };

  const displayImages = images.map((img, i) => {
    return <img src={img} className="preview-image" style={{height: "200px", width: "200px"}}/>;
  });

  const {
    input: textAreaInput,
    isValid: textAreaIsValid,
    hasError: textAreaHasError,
    setInputHandler: textAreaInputHandler,
    setTouchedHandler: textAreaTouchedHandler,
    reset: resetTextArea,
  } = useForm((input) => input.trim() !== "");

  const {
    input: fileInput,
    isValid: fileIsValid,
    hasError: fileHasError,
    setInputHandler: fileInputHandler,
    setTouchedHandler: fileTouchedHandler,
    reset: resetFile,
  } = useForm((input) => input);

  const addInfoAllValid = textAreaIsValid && rawFiles[0];

  const textAreaInputClasses = textAreaHasError
    ? `${styles.textarea} ${styles.invalid}`
    : styles.textarea;

  const fileInputClasses = fileHasError
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const addInfoSubmitButtonClasses = addInfoAllValid ? styles.btn : styles.btnW;

  

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <h1>Show your style</h1>
      <div>
        <input
          type="file"
          name="file"
          placeholder="add an Image"
          className={fileInputClasses}
          id="file"
          // value={rawFiles[0]}
          onChange={uploadMultipleFiles}
          onBlur={fileTouchedHandler}
          accept="image/*"
        />
        {/* {fileHasError && (
          <p style={{ color: "#aa0b20" }}>A valid image must be added</p>
        )} */}
        {displayImages}
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
