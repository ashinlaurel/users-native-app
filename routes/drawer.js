import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./homestack";
import AboutStack from "./aboutstack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import CreateNewUserStack from "./createnewuserstack";
import LoginStack from "./loginstack";
import RegisterStack from "./registerstack";
import Header from "../shared/header";

// const Drawer = createDrawerNavigator();

// const AppDrawer = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" children={HomeStack} />
//         <Drawer.Screen name="Create User" children={CreateNewUserStack} />
//         <Drawer.Screen name="Login" component={Login} />
//         <Drawer.Screen name="Register" component={Register} />
//         <Drawer.Screen name="About" children={AboutStack} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppDrawer;

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  CreateUser: {
    screen: CreateNewUserStack,
  },

  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  About: {
    screen: AboutStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
