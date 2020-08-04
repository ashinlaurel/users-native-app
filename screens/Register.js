import React from "react";
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
import { auth } from "../firebase/firebase";

const Register = ({ addUser }) => {
  const registerUser = (values) => {
    console.log(values);
    //TODO: conf Pass
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .set({
            name: values.name,
            email: values.email,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={[t.m5]}>
      <Formik
        initialValues={{ name: "", email: "", password: "", confPassword: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          registerUser(values);
          //   console.log(values);
        }}
      >
        {(props) => (
          <View style={[t.mY8, t.wFull, t.pX3]}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="black"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
            />
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
            <TextInput
              placeholder="Confirm Password"
              type="password"
              placeholderTextColor="black"
              onChangeText={props.handleChange("confPassword")}
              value={props.values.confPassword}
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
    </View>
  );
};

export default Register;
