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

const CreateNewEvent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [err, setErr] = useState("");

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
    // console.log(values.name == "");
    if (values.name == "") {
      setErr("All fields are empty!");
      Alert.alert("Error", "Fields are empty ");
      return;
    }

    db.collection("events")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
      })
      .then(() => {
        console.log("here");
        Alert.alert("Even created");
      })

      .catch((err) => {
        console.log(err.code);
        // return;
      });
  };

  return (
    <ScrollView>
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
              <Text style={[t.text4xl, t.mB8, t.mX4, t.textCenter, t.fontBold]}>
                Add New Event
              </Text>
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
                      value={organisation.name}
                    />
                  ))}
                </Picker>
              </View>
              <View style={[t.mY2, t.wFull, t.pX3]}>
                <Button
                  title="Select Date"
                  onPress={showDatePicker}
                  color="#1B719E"
                />
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
                <Button
                  title="Select Time"
                  onPress={showTimePicker}
                  color="#1B719E"
                />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={(date) =>
                    handleTimeConfirm(date, props.setFieldValue)
                  }
                  onCancel={hideTimePicker}
                />
              </View>

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

export default CreateNewEvent;
