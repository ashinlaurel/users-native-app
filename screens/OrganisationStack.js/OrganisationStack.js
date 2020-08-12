import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Organisations from "./Organisations";
import OrganisationDetails from "./OrganisationDetails";
import CreateNewOrganisation from "./createneworganisation";
import OrganisationEvents from "./OrganisationEvents";
import EventDetails from "../EventStack/eventDetails";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function OrganisationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrganisationsList"
        component={Organisations}
        options={{
          headerStyle: {
            backgroundColor: "#E91E63",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="OrganisationDetails"
        component={OrganisationDetails}
        options={{
          headerStyle: {
            backgroundColor: "#E91E63",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CreateOrganisation"
        component={CreateNewOrganisation}
        options={{
          headerStyle: {
            backgroundColor: "#E91E63",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UpcomingEvents"
        component={OrganisationEvents}
        options={{
          headerStyle: {
            backgroundColor: "#E91E63",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
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
