import React, { useContext } from "react";
import { View, Text, Image, Button } from "react-native";
import { t } from "react-native-tailwindcss";
// import { Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import { LoginContext } from "../../context/LoginContext";
import { auth } from "../../firebase/firebase";
import AsyncStorage from "@react-native-community/async-storage";

const AdminDetails = ({ route, navigation }) => {
  // console.log("hello");
  const { user, setUser, isLoggedIn, setIsLoggedIn ,setRole} = useContext(LoginContext);

  const logout = async () => {
    auth.signOut().then(
      async function () {
        // Sign-out successful.
        console.log("Logged Out");
        // setError("Logged Out");
        setIsLoggedIn(false);
        setUser({ user: null });
        await AsyncStorage.setItem("user", "null");
        await AsyncStorage.setItem("isLoggedIn", "false");
        navigation.navigate("Home");
        setRole(2);

      },
      function (error) {
        // An error happened.
      }
    );
  };

  return (
    <View
      style={[
        t.flex,
        t.itemsCenter,
        t.justifyCenter,
        t.mY0,
        t.mX1,
        t.mT10,
        t.mB20,
        t.bgGray100,
        t.rounded,
        t.pY10,
      ]}
    >
      <View>
        <FontAwesome
          name="user-circle"
          size={64}
          color="#e80e5a"
          style={[t.mT4, t.textCenter]}
        />
      </View>

      <View style={[]}>
        <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
          <Text style={[t.text2xl]}>Email: {user.email}</Text>
        </View>
      </View>
      {/* <Text style={[t.textBase, t.textCenter, t.mY5]}>
        You are logged in as Admin
      </Text> */}
      <View style={[t.mX3]}>
        <Button title="Logout" color="" onPress={logout} />
      </View>
    </View>
  );
};

export default AdminDetails;
