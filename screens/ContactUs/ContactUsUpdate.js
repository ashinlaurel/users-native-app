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
  Picker,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";

const ContactUsUpdate = () => {
  const [err, setErr] = useState("");

  // Getting organisations for drop down menu -------------------------------------------------------------------

  const sendUser = async (values) => {
    // console.log(values.name == "");
    if (values.name == "" || values.phone == "") {
      Alert.alert("Required fields are not filled");
      return;
    }

    var Ref = db.collection("contactinfo").doc("nE27zOdX2f17ug2kg7kh");

    // Set the "capital" field of the city 'DC'
    Ref.update({
      name: values.name,
      phone: values.phone,
    })
      .then(function () {
        console.log("Document successfully updated!");
        Alert.alert("Contact Updated");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        Alert.alert("Error");
      });
  };

  return (
    <ScrollView>
      <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Formik
          initialValues={{
            name: "",
            phone: "",
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
                Update Contact Info
              </Text>
              <TextInput
                placeholder="New Contact "
                placeholderTextColor="black"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="New Contact phone"
                placeholderTextColor="black"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />

              <View style={[t.mY2, t.mX3]}>
                <Button
                  title="Submit"
                  color="#1B719E"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
      {/* <Tex>{err}</Tex> */}
    </ScrollView>
  );
};

export default ContactUsUpdate;
