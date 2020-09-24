import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CircularList from "./Circulars";
import CircularView from "./CircularView";
// import CreateNewEvent from "./createnewevent";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function CircularStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Circulars List "
        component={CircularList}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Circular View"
        component={CircularView}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />

      {/* <Stack.Screen name="Create Event" component={CreateNewEvent} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
