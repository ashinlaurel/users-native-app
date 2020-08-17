import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import BibleInitial from "./BibleInitial";
import Books from "./Books";
import Chapters from "./Chapters";
import MalVerses from "./MalVersus";
import Verses from "./Verses";
import MalBooks from "./MalBooks";
import MalChapters from "./MalChapters";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function BibleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bible"
        component={BibleInitial}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Books"
        component={Books}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MalBooks"
        component={MalBooks}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MalChapters"
        component={MalChapters}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Verses"
        component={Verses}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MalVerses"
        component={MalVerses}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />

      {/* <Stack.Screen name="Create Event" component={CreateNewEvent} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
