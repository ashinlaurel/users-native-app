import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import About from "../screens/about";
import { t } from "react-native-tailwindcss";
import React from "react";
import Header from "../shared/header";
import HomeStack from "./homestack";
import Register from "../screens/Register";

const screens = {
  About: {
    screen: Register,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  Home: HomeStack,
};

const RegisterStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: [t.bgBlue200],
  },
});
export default RegisterStack;
