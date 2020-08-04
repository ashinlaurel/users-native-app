import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homestack";
import AboutStack from "./aboutstack";
import Login from "../screens/Login";
import Register from "../screens/Register";

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  About: {
    screen: AboutStack,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
});

export default createAppContainer(RootDrawerNavigator);
