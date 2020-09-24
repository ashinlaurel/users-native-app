import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import CreateNewCircular from "./createnewcircular";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function CreateNewCircularStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Circular"
        component={CreateNewCircular}
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
