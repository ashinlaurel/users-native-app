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
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function OrganisationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrganisationsList" component={Organisations} />
      <Stack.Screen
        name="OrganisationDetails"
        component={OrganisationDetails}
      />
      <Stack.Screen
        name="CreateOrganisation"
        component={CreateNewOrganisation}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
