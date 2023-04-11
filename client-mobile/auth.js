import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  accessToken: "",
  UserId: "",
  username: "",

  setAccessToken: "",
  setUserId: "",
  setUsername: ""
});

export function AuthProvider({children}) {
    const [accessToken, setAccessToken] = useState("")
    const [UserId, setUserId] = useState("")
    const [username, setUsername] = useState("")
    useEffect(() => {
        AsyncStorage.getItem("accessToken")
            .then((val) => {
                setAccessToken(val)
                console.log(val, "ACCESS TOKEN")
            })
        AsyncStorage.getItem("UserId")
            .then((val) => {
                console.log(val, "USER ID")
                setUserId(val)
            })
        AsyncStorage.getItem("username")
            .then((val) => {
                setUsername(val)
                console.log((val, "USERNAME"))
            })
    }, [])
    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, UserId, setUserId, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}
