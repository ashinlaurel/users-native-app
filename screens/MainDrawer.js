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
import VerifyUsers from "./verifyUsers/VerifyUsers";
import CreateNewCircular from "./CreateCircularStack/CreateCircularStack";
import VerifyUsersStack from "./verifyUsers/VerifyUsersStack";
import CreateLectionaryStack from "./CreateLectionaryStack/CreateLectionaryStack";
import LoginCode from "./LoginCodeStack/LoginCode";
import ContactUs from "./ContactUs/ContactUs"
import ContactUsInfoStack from "./ContactUs/ContactUsInfoStack";
import CreateMessageStack from "./CreateMessageStack/CreateMessageStack";
import CreateOrganisationStack from "./CreateOrganisationStack/CreateOrganisationStack";
import CreateLoginCodeStack from "./CreateLoginCodeStack/CreateLoginCodeStack";

const Drawer = createDrawerNavigator();

// import Navigator from "./routes/drawer";

export default function MainDrawer() {
  const { user, setUser, isLoggedIn, setIsLoggedIn, role } = useContext(
    LoginContext
  );
  return (
    <NavigationContainer>
      {/* <LoginContextHOC> */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Log In" component={LoginStack} />
        <Drawer.Screen name="Sign Up" component={RegisterStack} />
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen name="Create Message" component={CreateMessageStack} />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen name="Create Member" component={CreateMemberStack} />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen name="Create Event" component={CreateEventStack} />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen
              name="Create Organisation"
              component={CreateOrganisationStack}
            />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen name="Verify Users" component={VerifyUsersStack} />
            <Drawer.Screen name="Add Circular" component={CreateNewCircular} />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen
              name="Add Lectionary"
              component={CreateLectionaryStack}
            />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen
              name="Add/Remove Login code"
              component={CreateLoginCodeStack }
            />
          </>
        ) : null}
        {isLoggedIn && role == 0 ? (
          <>
            <Drawer.Screen
              name="Update Contact info"
              component={ContactUsInfoStack}
            />
          </>
        ) : null}
      </Drawer.Navigator>
      {/* </LoginContextHOC> */}
    </NavigationContainer>
  );
}
