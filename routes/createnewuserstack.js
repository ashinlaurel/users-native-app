import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CreateNewUser from "../screens/createnewuser";
import { t } from "react-native-tailwindcss";
import React from "react";
import Header from "../shared/header";

const screens = {
  CreateNewUser: {
    screen: CreateNewUser,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
};

const CreateNewUserStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: [t.bgTeal300],
  },
});
export default CreateNewUserStack;
