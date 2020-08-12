import React, { useEffect, useContext } from "react";

import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// -----------------------------------------------------------------
import MainStack from "./MainStack/MainStack";
import LoginStack from "./LoginStack/LoginStack";
import RegisterStack from "./RegisterStack/RegisterStack";
import CreateMemberStack from "./CreateMemberStack.js/CreateMemberStack";
import CreateEventStack from "./CreateEventStack/CreateEventStack";
// import LoginContextHOC from "./context/LoginContext";
import { LoginContext } from "../context/LoginContext";
import CreateNewOrganisation from "./OrganisationStack.js/createneworganisation";
import CreateNewEvent from "./CreateEventStack/createnewevent";
import CreateNewMessage from "./MessageStack/CreateMessage";

const Drawer = createDrawerNavigator();

// import Navigator from "./routes/drawer";

export default function MainDrawer() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  return (
    <NavigationContainer>
      {/* <LoginContextHOC> */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Log In" component={LoginStack} />
        <Drawer.Screen name="Sign Up" component={RegisterStack} />
        {isLoggedIn ? (
          <>
            <Drawer.Screen name="Create Member" component={CreateMemberStack} />
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <Drawer.Screen
              name="Create Organisation"
              component={CreateNewOrganisation}
            />
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <Drawer.Screen name="Create Event" component={CreateNewEvent} />
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <Drawer.Screen name="Create Message" component={CreateNewMessage} />
          </>
        ) : null}
      </Drawer.Navigator>
      {/* </LoginContextHOC> */}
    </NavigationContainer>
  );
}
