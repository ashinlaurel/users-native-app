import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import CreateNewUser from "./createnewuser";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function CreateMemberStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create User"
        component={CreateNewUser}
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
