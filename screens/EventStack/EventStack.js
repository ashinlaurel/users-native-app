import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Events from "./Events";
import EventDetails from "./eventDetails";
import CreateNewEvent from "./createnewevent";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events List" component={Events} />
      <Stack.Screen name="Event Details" component={EventDetails} />
      <Stack.Screen name="Create Event" component={CreateNewEvent} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
