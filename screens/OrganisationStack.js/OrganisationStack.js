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
import EditOrgEvent from "./EditOrganisationEvent";
import EditOrganisation from "./EditOrganisation";
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
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="OrganisationDetails"
        component={OrganisationDetails}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CreateOrganisation"
        component={CreateNewOrganisation}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UpcomingEvents"
        component={OrganisationEvents}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditOrg"
        component={EditOrganisation}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          headerStyle: {
            backgroundColor: "#1B719E",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditOrgEventDetails"
        component={EditOrgEvent}
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
