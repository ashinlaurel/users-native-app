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
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import Constants from "expo-constants";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

const CreateNewEvent = () => {
  const [imageUri, setImageUri] = useState(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date, callback) => {
    console.log("A date has been picked: ", date);
    callback("date", moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  const handleTimeConfirm = (date, callback) => {
    console.log("A date has been picked: ", date);
    callback("time", moment(date).format("HH:mm"));
    hideTimePicker();
  };

  const sendUser = async (values) => {
    let newId, URL;
    console.log(values);
    db.collection("events")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      })
      .then(() => {
        console.log("here");
      })

      .catch((err) => {
        console.log(err.code);
        // return;
      });
  };

  return (
    <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
      <Formik
        initialValues={{
          name: "",
          location: "",
          date: moment().format("YYYY-MM-DD"),
          time: moment().format("HH:mm"),
          time: "",
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
            <TextInput
              placeholder="Event Name"
              placeholderTextColor="black"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
            />

            <TextInput
              placeholder="Location"
              placeholderTextColor="black"
              onChangeText={props.handleChange("location")}
              value={props.values.location}
              style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
            />
            <View style={[t.mY2, t.wFull, t.pX3]}>
              <Button title="Select Date" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) =>
                  handleDateConfirm(date, props.setFieldValue)
                }
                onCancel={hideDatePicker}
              />
            </View>
            <View style={[t.mY2, t.wFull, t.pX3]}>
              <Button title="Select Time" onPress={showTimePicker} />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={(date) =>
                  handleTimeConfirm(date, props.setFieldValue)
                }
                onCancel={hideTimePicker}
              />
            </View>

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

export default CreateNewEvent;
