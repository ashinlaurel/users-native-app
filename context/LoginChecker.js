import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginContext } from "./LoginContext";

export default function LoginChecker(props) {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const checkLoggedIn = async () => {
    const user = await AsyncStorage.getItem("user");
    console.log(user, "LC");
    if (user === "null") {
      console.log("LoginCheck Logged Out");
      await setIsLoggedIn(false);
      await setUser({ user: null });
    } else {
      console.log("loginCheck logged IN", user);
      await setIsLoggedIn(true);
      await setUser({ email: user });
    }
  };

  useEffect(() => {
    console.log("USE EFFECT");
    checkLoggedIn();
  }, []);
  return <>{props.children}</>;
}
