import React, { useState,useEffect, useContext ,useRef} from "react";
import { StyleSheet, Text, View, Button,Platform } from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
// Navigation Imports----------------------------------------------
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// -----------------------------------------------------------------
// NOTIFICATIONS
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


import DataContextHOC from "./context/DataContext";
import LoginContextHOC from "./context/LoginContext";
import MainDrawer from "./screens/MainDrawer";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// import Navigator from "./routes/drawer";

export default function App() {
  ///// NOTIFICATION
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  ///// NOTIFICATION
  // Error fixes--------------------------------------------------
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };

  // ------------------------------------------------------------------------

  return (
    <LoginContextHOC>
      <DataContextHOC>
        <MainDrawer />
        
      </DataContextHOC>
    </LoginContextHOC>
  );
}

const styles = StyleSheet.create({});


// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }