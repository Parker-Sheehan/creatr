import React, {ReactNode, useState} from "react"
import { useNavigate } from "react-router-dom";

let logoutTimer:ReturnType<typeof setTimeout> | number;

type chatRoom = {id:number, user_1:number, user_2:number}

type AuthContextObj = {
    chatRooms: {id:number, user_1:number, user_2:number}[];
    login: (token: string, exp:number, Id: number, bio: string, photo_added: boolean, name: string) => void;
    logout: () => void;
    chatRoomsArrayHandler: ([]:chatRoom[]) => void;
}

export const AuthContext = React.createContext<AuthContextObj>({
    chatRooms: [],
    login: (token: string, exp:number, Id: number, bio: string, photo_added: boolean, name:string) => {},
    logout: () => {},
    chatRoomsArrayHandler: ([]:chatRoom[]) => {},
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

    const [chatRoomsArray,setchatRoomsArray] = useState<chatRoom[]>([]);


    const chatRoomsArrayHandler = (arr:chatRoom[]) => {
        console.log(arr[0])

        setchatRoomsArray(arr)
    }

    console.log(typeof chatRoomsArray)

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

    // const  chatRooms: {id:number, user_1:number, user_2:number}[] = []

    const authFunctions = {
        chatRooms: chatRoomsArray,
        login,
        logout,
        chatRoomsArrayHandler
    }

    return(
        <AuthContext.Provider value={authFunctions}>
        {children.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;