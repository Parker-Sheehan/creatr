import './App.css';
import { useEffect } from 'react';
import GetStarted from './components/splash/GetStarted';
import AddAccountInfo from './components/splash/AddAccountInfo';
import Main from './components/main/Main';
import { useNavigate} from 'react-router-dom';
import {
  Routes,
  Route
} from "react-router-dom";

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
      {localStorage.getItem("token") && localStorage.getItem("bio") !== "" && localStorage.getItem("photo_added") === 'true' && <Route index element={<Main/>}/>}
      <Route path='/AddAccountInfo' element={<AddAccountInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
