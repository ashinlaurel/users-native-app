import React, { createContext, useState, useEffect } from "react";

export const MembersContext = createContext();

const MembersContextHOC = (props) => {
  const [filterusers, setFilterUsers] = useState([]);

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
    <MembersContext.Provider value={{ filterusers, setFilterUsers }}>
      {props.children}
    </MembersContext.Provider>
  );
};
export default MembersContextHOC;
