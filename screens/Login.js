import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import Header from "../shared/header";

const Login = ({ addUser }) => {
  const [error, setError] = useState("");
  const loginUser = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .user((user) => {
        console.log("Logged In");
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <View>
      {/* <Header /> */}
      <View style={[t.m5]}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            // actions.resetForm();
            loginUser(values);
            //   console.log(values);
          }}
        >
          {(props) => (
            <View style={[t.mY8, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Email"
                type="email"
                placeholderTextColor="black"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Password"
                type="password"
                placeholderTextColor="black"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
              />
              <View style={[t.mY2]}>
                <Button
                  title="Submit"
                  color="gray"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <Text>Hello{error}</Text>
      </View>
    </View>
  );
};

export default Login;
