import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
import { t } from "react-native-tailwindcss";

// Navigation Imports----------------------------------------------
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./InitialScreen";
import Home from "./home";
import UserDetails from "./userDetails";
import EventStack from "../EventStack/EventStack";
import OrganisationStack from "../OrganisationStack.js/OrganisationStack";
// import MessageStack from "../MessageStack/MessageStack";
import LoginChecker from "../../context/LoginChecker";
import LoginStack from "../LoginStack/LoginStack";
import { Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoginContext } from "../../context/LoginContext";
import Register from "../RegisterStack/Register";
import AdminDetails from "./AdminDetails";
import MessageStack from "../MessageStack/MessageStack";
// -----------------------------------------------------------------

const Stack = createStackNavigator();

// import Navigator from "./routes/drawer";

export default function MainStack() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  return (
    <LoginChecker>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={InitialScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <View style={[t.mR2]}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(isLoggedIn);
                    isLoggedIn
                      ? navigation.navigate("AdminDetails")
                      : navigation.navigate("Login");
                  }}
                >
                  <Image
                    style={[t.w10, t.h10, t.roundedFull]}
                    source={{
                      uri:
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Members"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Events"
          component={EventStack}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Organisations"
          component={OrganisationStack}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Message"
          component={MessageStack}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="AdminDetails"
          component={AdminDetails}
          options={{
            headerStyle: {
              backgroundColor: "#E91E63",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </LoginChecker>
  );
}

const styles = StyleSheet.create({});
