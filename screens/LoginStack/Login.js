import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  Image,
} from "react-native";

import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import { auth } from "../../firebase/firebase";
import gif from "../../assets/checkmark.gif";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginContext } from "../../context/LoginContext";

const Login = (props) => {
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(false);
  const { navigate } = props.navigation;
  const { setRole, setUser, isLoggedIn, setIsLoggedIn } = useContext(
    LoginContext
  );
  console.log(isLoggedIn);

  const loginUser = async (values) => {
    // console.log(values.email, values.password);
    let r = 2;
    try {
      let user = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log("KEY", user.email);
      db.collection("users")
        .doc(user.user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data().role);
            setRole(doc.data().role);
            r = await doc.data().role;
            // console.log("SETITEM", "" + r);
            await AsyncStorage.setItem("role", "" + r);
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting Login Doc:", error);
        });

      console.log("Logged In", user.user.email);
      // setError("Logged In");
      setIsLoggedIn(true);
      setUser({ email: user.user.email });
      await AsyncStorage.setItem("user", user.user.email);
      await AsyncStorage.setItem("isLoggedIn", "true");

      navigate("Home");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  // const logout = async () => {
  //   // const value = await AsyncStorage.getItem("user");
  //   // console.log(value);
  //   // props.navigation.navigate("Home");
  //   auth.signOut().then(
  //     async function () {
  //       // Sign-out successful.
  //       console.log("Logged Out");
  //       setError("Logged Out");
  //       setIsLoggedIn(false);
  //       setUser({ user: null });
  //       await AsyncStorage.setItem("user", "null");
  //       await AsyncStorage.setItem("isLoggedIn", "false");
  //     },
  //     function (error) {
  //       // An error happened.
  //     }
  //   );
  // };

  useEffect(() => {
    // auth.onAuthStateChanged(function (user) {
    //   if (user) {
    //     console.log("User Signed In");
    //   } else {
    //     // No user is signed in.
    //     console.log("User NOT Signed In");
    //   }
    // });
  });

  return (
    <View>
      {/* Modal */}
      <Modal visible={modalState}>
        <View>
          <Image source={gif} size={40} />
        </View>
      </Modal>
      {/* <Header /> */}
      <Text
        style={[
          t.text3xl,
          t.pY3,
          t.textCenter,
          t.mT10,
          t.fontBold,
          t.textGray800,
        ]}
      >
        LOGIN
      </Text>
      <View style={[t.mX5]}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            // actions.resetForm();
            loginUser(values);
            //   console.log(values);
          }}
        >
          {(props) => (
            <View style={[t.mY2, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Email"
                type="email"
                defaultValue="test@test.com"
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Password"
                type="password"
                secureTextEntry
                autoCapitalize="none"
                defaultValue="password"
                placeholderTextColor="black"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <View style={[t.mY2]}>
                <Button
                  title="Login"
                  color="#1B719E"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <Text style={[t.textCenter, t.mY2]}>
          Don't Have an Account? Make one now!
        </Text>
        <View style={[t.mX3]}>
          <Button
            title="Sign Up"
            color="gray"
            onPress={() => {
              navigate("Signup");
            }}
          />
        </View>
        {/* <View style={[t.mX3]}>
          <Button title="Logout" color="gray" onPress={logout} />
        </View> */}
        <Text>{error}</Text>
      </View>
    </View>
  );
};

export default Login;
