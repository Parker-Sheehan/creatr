import './App.css';
import { useEffect } from 'react';
import GetStarted from './components/splash/GetStarted';
import AddAccountInfo from './components/splash/AddAccountInfo';
import Main from './components/main/Main';
import ProfileView from './components/main/ProfileView'
import { useNavigate} from 'react-router-dom';
import {
  Routes,
  Route
} from "react-router-dom";
import EditAccount from './components/main/EditAccount';
import OthersProfileView from './components/main/OthersProfileView';

function App() { 
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("bio") === "" || localStorage.getItem("photo_added") === 'false' ){
      navigate("/AddAccountInfo")
    }
  }, [])


  return (
    <div className="App">
      <Routes>
      {!localStorage.getItem("token") && <Route index element={<GetStarted/>}/>}
      {localStorage.getItem("token") && localStorage.getItem("bio") !== "" && localStorage.getItem("photo_added") !== '' && <Route index element={<Main/>}/>}
      {localStorage.getItem("token") && localStorage.getItem("bio") !== "" && localStorage.getItem("photo_added") !== '' && <Route path='/profile' element={<ProfileView/>}/>}
      {localStorage.getItem("token") && localStorage.getItem("bio") !== "" && localStorage.getItem("photo_added") !== '' && <Route path='/otherProfile/:params' element={<OthersProfileView/>}/>}
      {localStorage.getItem("token") && localStorage.getItem("bio") !== "" && localStorage.getItem("photo_added") !== '' && <Route path='/editprofile' element={<EditAccount/>}/>}
      <Route path='/AddAccountInfo' element={<AddAccountInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
