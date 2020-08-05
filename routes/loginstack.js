import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import About from "../screens/about";
import { t } from "react-native-tailwindcss";
import React from "react";
import Header from "../shared/header";
import Login from "../screens/Login";
import HomeStack from "./homestack";

const screens = {
  About: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  Home: HomeStack,
};

const LoginStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: [t.bgBlue200],
  },
});
export default LoginStack;
