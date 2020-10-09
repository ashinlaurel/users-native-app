import React from "react";
import { StyleSheet, Text, View } from "react-native";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import CreateNewUser from "./createnewuser";
import HouseNameList from "./HouseNameList";
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
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="HouseNameList"
        component={HouseNameList}
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
