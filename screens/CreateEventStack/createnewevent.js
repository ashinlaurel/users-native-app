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
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";

const CreateNewEvent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Getting organisations for drop down menu -------------------------------------------------------------------
  const [organisations, setOrganisations] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  useEffect(() => {
    (async function getter() {
      const eventsRef = db.collection("organisations");
      const snapshot = await eventsRef.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      let tempusers = snapshot.docs.map((i) => ({
        key: i.id,
        ...i.data(),
      }));
      setOrganisations(tempusers);
    })();
  }, []);

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
    callback("time", moment(date).format("h:mm a"));
    hideTimePicker();
  };

  const sendUser = async (values) => {
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
          organisation: "",
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

            <View style={[]}>
              <Picker
                selectedValue={props.values.organisation}
                style={{ height: 50, width: 370 }}
                onValueChange={(itemValue, itemIndex) =>
                  props.setFieldValue("organisation", itemValue)
                }
              >
                <Picker.Item label="Select Organisation" value="" />
                {organisations.map((organisation) => (
                  <Picker.Item
                    label={organisation.name}
                    value="{organisation.name}"
                  />
                ))}
              </Picker>
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