import React, {ReactNode} from "react"
import { useNavigate } from "react-router-dom";

let logoutTimer:ReturnType<typeof setTimeout> | number;

type AuthContextObj = {
    login: (token: string, exp:number, Id: number, bio: string, photo_added: boolean, name: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextObj>({
    login: (token: string, exp:number, Id: number, bio: string, photo_added: boolean, name:string) => {},
    logout: () => {},
})

const calculateRemainingTime = (exp: number) => {
    const currentTime = new Date().getTime();
    const expTime = exp;
    const remainingTime = expTime - currentTime;
    return remainingTime;
  };

const getLocalData = () => {
    const storeToken = localStorage.getItem("token")
    const storedExp = localStorage.getItem("exp")

    if(logoutTimer > 0){
        clearTimeout(logoutTimer)
      }
}

export const AuthContextProvider = (children : { children: ReactNode }) => {

    const navigate = useNavigate()


    const login = (token: string, exp:number, Id: number, bio: string, photo_added: boolean, name: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("exp", `${exp}`)
    localStorage.setItem('id', `${Id}`)
    localStorage.setItem('bio', bio)
    localStorage.setItem('photo_added', `${photo_added}`)
    localStorage.setItem('name', name)

    let remainingTime = calculateRemainingTime(exp);
    logoutTimer = setTimeout(logout, remainingTime);
    }

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("bio");
    localStorage.removeItem("photo_added");
    navigate("/")
    }

    const authFunctions = {
        login,
        logout,
    }

    return(
        <AuthContext.Provider value={authFunctions}>
        {children.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;