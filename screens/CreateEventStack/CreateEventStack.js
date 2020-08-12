import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
// import CreateNewUser from "./createnewuser";
import CreateNewEvent from "./createnewevent";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function CreateEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={CreateNewEvent}
        options={{
          headerStyle: {
            backgroundColor: "#E91E63",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
