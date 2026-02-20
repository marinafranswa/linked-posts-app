import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../env/env.environment";

export const tokenContext = createContext();
export function TokenContextProvider({ children }) {
  let [userToken, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

let[userData,setUser]=useState(null)


  useEffect(() => {
      if (localStorage.getItem("token")!== null) {
      axios.get(`${baseUrl}/users/profile-data`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
      }).then((response) => {
          setUser(response.data.data.user)
        })
      }
  },[])
  return (
    <tokenContext.Provider value={{ userToken, setToken, userData }}>
      {children}
    </tokenContext.Provider>
  );
}
