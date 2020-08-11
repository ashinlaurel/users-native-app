import React, { useState, useEffect } from "react";
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
import { Icon } from "galio-framework";

import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import { auth } from "../../firebase/firebase";
import gif from "../../assets/checkmark.gif";

const Login = (props) => {
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(false);
  const { navigate } = props.navigation;
  const loginUser = (values) => {
    console.log(values.email, values.password);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        console.log("Logged In");
        setError("Logged In");
        setModalState(true);
        setTimeout(() => {
          navigate("Home");
          setModalState(false);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
      });
  };

  const logout = () => {
    // props.navigation.navigate("Home");
    // auth.signOut().then(
    //   function () {
    //     // Sign-out successful.
    //     console.log("Logged Out");
    //     setError("Logged Out");
    //   },
    //   function (error) {
    //     // An error happened.
    //   }
    // );
  };

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
                style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
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
                style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
              />
              <View style={[t.mY2]}>
                <Button
                  title="Login"
                  color="gray"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <Button title="Logout" color="gray" onPress={logout} />
        <Text>{error}</Text>
      </View>
    </View>
  );
};

export default Login;
