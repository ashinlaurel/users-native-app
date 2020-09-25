import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// -----------------------------------------------------------------

import DataContextHOC from "./context/DataContext";
import LoginContextHOC from "./context/LoginContext";
import MainDrawer from "./screens/MainDrawer";

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
    <LoginContextHOC>
      <DataContextHOC>
        <MainDrawer />
      </DataContextHOC>
    </LoginContextHOC>
  );
}

const styles = StyleSheet.create({});
