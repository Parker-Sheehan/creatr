import React, { useState, useRef } from "react";
import styles from "../splash/AddAccountInfo.module.css";
import useForm from "../../hooks/useForm";
import axios from "axios";
import storage from "../../firebase-config";
import SettingsMenu from "./SettingsMenu";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const EditAccount = () => {
  let navigate = useNavigate();

  const [rawFiles, setRawFiles] = useState([]);
  const [images, setImages] = useState([]);
  const textAreaInput = useRef("");
  const fileInput = useRef("");
  const nameInput = useRef("");
  const [bioState, setBioState] = useState(`${localStorage.getItem("bio")}`);
  const [nameState, setNameState] = useState(`${localStorage.getItem("name")}`);

  const getLinks = async () => {
    const array = [];
    const files = [...rawFiles];
    console.log(files);
    for (const file of files) {
      try {
        const storageRef = await ref(
          storage,
          `/${localStorage.getItem("id")}/${file.name}`
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

        console.log('yay')
        console.log(urls[0]);
        if (!urls[0]) {
          const uploadObj = {
            token: localStorage.getItem("token"),
            image: localStorage.getItem("photo_added"),
            bio: bioState,
            name: nameState,
          };

          console.log(uploadObj.image)


          axios
            .put(`/addInfo/${localStorage.getItem("id")}`, uploadObj)
            .then((data) => {
              console.log(data.data);
              localStorage.setItem("bio", data.data.bio);
              localStorage.setItem("name", data.data.name);

              navigate("/profile");
            })
            .catch((err) => console.log(err));
        } else {
          const uploadObj = {
            token: localStorage.getItem("token"),
            image: urls[0],
            bio: bioState,
            name: nameState,
          };

          console.log(uploadObj)

          axios
            .put(`/addInfo/${localStorage.getItem("id")}`, uploadObj)
            .then((data) => {
              console.log(data.data);
              localStorage.setItem("bio", data.data.bio);
              localStorage.setItem("photo_added", data.data.photo_added);
              localStorage.setItem("name", data.data.name);
              navigate("/profile");
            })
            .catch((err) => console.log(err));
        }

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

  //   const submitHandler = (event) => {
  //     event.preventDefault();

  //     const uploadObj = {
  //       token: localStorage.getItem('token'),
  //       image: fileInput.current.value,
  //       bio: textAreaInput.current.value
  //     }

  //     axios.put(`/addInfo/${localStorage.getItem('id')}`, uploadObj)
  //         .then((data) => {
  //           console.log(data.data)
  //         })
  //         .catch(err => console.log(err))
  //   };

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
    return (
      <img
        src={img}
        className="preview-image"
        style={{ height: "200px", width: "200px" }}
      />
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.main}>
        <h1>Edit Profile</h1>
        <div>
          <label htmlFor="">Edit name: </label>
          <input
            type="text"
            ref={nameInput}
            value={nameState}
            onChange={(e) => {
              setNameState(e.target.value);
            }}
          />
        </div>
        <h2>Change Profile Photo</h2>
        <div>
          <input
            type="file"
            name="file"
            placeholder="add an Image"
            onChange={uploadMultipleFiles}
            id="file"
            accept="image/*"
            ref={fileInput}
          />
          {/* {fileHasError && (
          <p style={{ color: "#aa0b20" }}>A valid image must be added</p>
        )} */}
          {fileInput.current.value ? (
            displayImages
          ) : (
            <img
              src={localStorage.getItem("photo_added")}
              className="preview-image"
              onClick={() => {
                console.log(fileInput.current);
              }}
              style={{ height: "200px", width: "200px" }}
            />
          )}

          {}
        </div>
        <h2>Edit Bio</h2>
        <div>
          <textarea
            ref={textAreaInput}
            className={styles.textarea}
            value={bioState}
            onChange={(e) => {
              setBioState(e.target.value);
            }}
            id="text"
            placeholder="Tell us about your self..."
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
      <SettingsMenu />
    </>
  );
};

export default EditAccount;
