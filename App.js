import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// -----------------------------------------------------------------
import MainStack from "./screens/MainStack/MainStack";
import LoginStack from "./screens/LoginStack/LoginStack";
import RegisterStack from "./screens/RegisterStack/RegisterStack";
import CreateMemberStack from "./screens/CreateMemberStack.js/CreateMemberStack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// import Navigator from "./routes/drawer";

export default function App() {
  // Error fixes--------------------------------------------------
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };
  // ------------------------------------------------------------------------

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Log In" component={LoginStack} />
        <Drawer.Screen name="Sign Up" component={RegisterStack} />
        <Drawer.Screen name="Create Member" component={CreateMemberStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
