import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";

const EditOrganisation = ({ route, navigation }) => {
  const { name, address, email, phone, details, key } = route.params;

  const sendUser = async (values) => {
    if (values.name == "") {
      Alert.alert("Error", "A Organisation name is necessary ");
      return;
    }
    let newId, URL;
    console.log(values);
    db.collection("organisations")
      .doc(key)
      .update({
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: values.email,
        details: values.details,
      })
      .then(() => {
        Alert.alert("Information updated");
        navigation.navigate("OrganisationsList");
      })

      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return (
    <ScrollView>
      <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Formik
          initialValues={{
            name: name,
            address: address,
            phone: phone,
            email: email,
            details: details,
          }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            // console.log(values);
            sendUser(values);
            // uploadImage();
          }}
        >
          {(props) => (
            <View style={[t.mY8, t.wFull, t.pX3]}>
              <Text style={[t.text4xl, t.mB8, t.mX4, t.textCenter, t.fontBold]}>
                Edit Organisation
              </Text>
              <TextInput
                placeholder="Organisation Name"
                placeholderTextColor="black"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />

              <TextInput
                placeholder="Address"
                placeholderTextColor="black"
                onChangeText={props.handleChange("address")}
                value={props.values.address}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="black"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Details"
                placeholderTextColor="black"
                onChangeText={props.handleChange("details")}
                value={props.values.details}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
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
    </ScrollView>
  );
};

export default EditOrganisation;
