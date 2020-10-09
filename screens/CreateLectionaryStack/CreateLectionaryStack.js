import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import CreateNewLet from "./CreateNewLet";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

export default function CreateEventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Lectionary"
        component={CreateNewLet}
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
