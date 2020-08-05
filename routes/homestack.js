import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import UserDetails from "../screens/userDetails";
import { t } from "react-native-tailwindcss";
import React from "react";
import Header from "../shared/header";

// const Stack = createStackNavigator();

// const HomeStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="UserDetails" component={UserDetails} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default HomeStack;

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Home" />,
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
    headerStyle: [t.bgBlue100],
    cardStyle: { backgroundColor: "#ffffff" },
  },
});
export default HomeStack;
