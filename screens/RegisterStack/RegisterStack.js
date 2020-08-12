import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./Register";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign Up"
        component={Register}
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
