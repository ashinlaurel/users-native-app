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

const EditMessage = ({ navigation, route }) => {
  const { mainheading, subheading, content, key } = route.params;

  const sendUser = async (values) => {
    if (values.mainheading == "" || values.subheading == "") {
      Alert.alert("Error", "Please fill the information ");
      return;
    }
    db.collection("messages")
      .doc(key)
      .update({
        mainheading: values.mainheading,
        subheading: values.subheading,
        content: values.content,
      })
      .then(() => {
        Alert.alert("Information updated");
        navigation.navigate("Messages");
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
            mainheading: mainheading,
            subheading: subheading,
            content: content,
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
              <Text style={[t.text4xl, t.mY8, t.mX4, t.textCenter, t.fontBold]}>
                Edit Message
              </Text>
              <TextInput
                placeholder="Main Heading"
                placeholderTextColor="black"
                onChangeText={props.handleChange("mainheading")}
                value={props.values.mainheading}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />

              <TextInput
                placeholder="Sub Heading"
                placeholderTextColor="black"
                onChangeText={props.handleChange("subheading")}
                value={props.values.subheading}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Message"
                placeholderTextColor="black"
                onChangeText={props.handleChange("content")}
                value={props.values.content}
                multiline={true}
                textAlignVertical="top"
                style={[t.pY4, t.pX4, t.bgWhite, t.roundedLg, t.mY3, t.h64]}
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

export default EditMessage;
