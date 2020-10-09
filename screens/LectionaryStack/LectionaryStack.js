import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LectDetails from "./LectDetails";
import LectionaryList from "./LectionaryList";

// import CreateNewEvent from "./createnewevent";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function LectionaryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectionary List"
        component={LectionaryList}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Lectionary Details"
        component={LectDetails}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      {/* <Stack.Screen
        name="Edit Event"
        component={EditEvent}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      /> */}
    </Stack.Navigator>
  );
}
