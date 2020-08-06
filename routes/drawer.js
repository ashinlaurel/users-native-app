import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homestack";
import AboutStack from "./aboutstack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import CreateNewUserStack from "./createnewuserstack";
import LoginStack from "./loginstack";
import RegisterStack from "./registerstack";
import Header from "../shared/header";

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
