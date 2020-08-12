import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import Message from "./Message";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={Message}
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
