import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./InitialScreen";
import Home from "./home";
import UserDetails from "./userDetails";
import EventStack from "../EventStack/EventStack";
// import LoginChecker from "../../context/LoginChecker";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function MainStack() {
  return (
    <View>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={InitialScreen} />
        <Stack.Screen name="Members" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Events" component={EventStack} />
      </Stack.Navigator>
      {/* <LoginChecker /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
