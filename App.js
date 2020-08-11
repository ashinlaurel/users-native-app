import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import InitialScreen from "./screens/InitialScreen";
import UserDetails from "./screens/userDetails";

const Stack = createStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={InitialScreen} />
        <Stack.Screen name="Members" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
