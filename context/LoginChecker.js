import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginContext } from "./LoginContext";

export default function LoginChecker(props) {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
  } = useContext(LoginContext);
  const checkLoggedIn = async () => {
    const user = await AsyncStorage.getItem("user");
    let rl = await AsyncStorage.getItem("role");
    // console.log("role", rl);
    setRole(parseInt(rl));
    console.log(user, "LC", user == null);
    if (user == "null" || user == null) {
      console.log("LoginCheck Logged Out");
      await setIsLoggedIn(false);
      await setUser({ user: null });
    } else {
      await setIsLoggedIn(true);
      await setUser({ email: user });
      console.log("loginCheck logged IN", user, isLoggedIn);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT");
    checkLoggedIn();
    console.log(isLoggedIn);
  }, []);
  return <>{props.children}</>;
}
