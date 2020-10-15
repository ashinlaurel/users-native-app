import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import LoginCode from "./LoginCode";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

export default function LoginCode() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login Code"
        component={LoginCode}
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
