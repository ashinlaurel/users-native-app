import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const LoginContext = createContext();

const LoginContextHOC = (props) => {
  const [user, setUser] = useState({ name: "." });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => {
  //     async () => {
  //       console.log("USEEFFECT");
  //       const user = await AsyncStorage.getItem("user");
  //       // console.log(user, "LC");
  //       if (user === "null") {
  //         console.log("LoginCheck Logged Out");
  //         await setIsLoggedIn(false);
  //         await setUser({ user: null });
  //       } else {
  //         console.log("loginCheck logged IN", user);
  //         await setIsLoggedIn(true);
  //         await setUser({ email: user });
  //       }
  //     };
  //   }, []);
  return (
    <LoginContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginContextHOC;
