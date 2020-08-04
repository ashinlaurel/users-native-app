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

const UserForm = ({ addUser }) => {
  return (
    <View>
      <Formik
        initialValues={{ name: "", age: "", address: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addUser(values);
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
              placeholder="Age"
              placeholderTextColor="black"
              onChangeText={props.handleChange("age")}
              value={props.values.age}
              style={[t.pY2, t.pX4, t.bgGray200, t.roundedFull, t.mY3]}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="black"
              onChangeText={props.handleChange("address")}
              value={props.values.address}
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

export default UserForm;
