import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
// import CreateNewUser from "./createnewuser";
import ContactUsUpdate from "./ContactUsUpdate";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function ContactUsInfoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Event"
        component={ContactUsUpdate}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
