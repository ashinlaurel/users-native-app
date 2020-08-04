import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import UserDetails from "../screens/userDetails";
import { t } from "react-native-tailwindcss";
import React from "react";
import Header from "../shared/header";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  UserDetails: {
    screen: UserDetails,
    navigationOptions: {
      title: "User Details",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: [t.bgTeal300],
  },
});
export default HomeStack;
