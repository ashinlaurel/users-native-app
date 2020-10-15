import React, { useEffect, useState } from "react";
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
import { auth, db } from "../../firebase/firebase";
import gif from "../../assets/checkmark.gif";

const Register = (props) => {
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(false);
  const { navigate } = props.navigation;
  const registerUser = (values) => {
    if (values.password != values.confPassword) {
      setError("Passwords Dont Match!");
      return;
    }
    // console.log(values);
    //TODO: conf Pass
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(({ user }) => {
        console.log(user.uid);
        db.collection("users")
          .doc(user.email)
          .set({
            name: values.name,
            email: values.email,
            uid: user.uid,
            role: 2, ///////////////////----------->Not verified
          })
          .then(function () {
            console.log("Document successfully written!");
            setModalState(true);
            setTimeout(() => {
              navigate("Home");
              setModalState(false);
            }, 1000);
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
      });
  };
  useEffect(() => {
    // auth.onAuthStateChanged(function (user) {
    //   if (user) {
    //     console.log(user);
    //     console.log("User Signed In");
    //   } else {
    //     // No user is signed in.
    //     console.log("User NOT Signed In");
    //   }
    // });
  });
  return (
    <View>
      <Modal visible={modalState}>
        <View>
          <Image source={gif} size={40} />
        </View>
      </Modal>

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
        REGISTER
      </Text>
      <View style={[t.mX5]}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confPassword: "",
            verified: 0,
          }}
          onSubmit={(values, actions) => {
            // actions.resetForm();
            registerUser(values);
            //   console.log(values);
          }}
        >
          {(props) => (
            <View style={[t.mY2, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="black"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                style={[t.pY2, t.pX4,t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                style={[t.pY2, t.pX4,t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Password"
                type="password"
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                style={[t.pY2, t.pX4,t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Confirm Password"
                type="password"
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={props.handleChange("confPassword")}
                value={props.values.confPassword}
                style={[t.pY2, t.pX4,t.bgWhite, t.roundedFull, t.mY3]}
              />
              <View style={[t.mY2]}>
                <Button
                  title="Register"
                  color="gray"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
        <Text style={[t.textCenter, t.fontBold]}>{error}</Text>
      </View>
    </View>
  );
};

export default Register;
