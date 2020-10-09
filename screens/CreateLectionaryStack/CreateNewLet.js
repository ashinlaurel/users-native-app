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

const CreateNewLet = () => {
  const [thecount, setTheCount] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [err, setErr] = useState("");

  // Getting organisations for drop down menu -------------------------------------------------------------------
  const [organisations, setOrganisations] = useState([
    // { heading: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [lessons, setLessons] = useState([{ title: "", lesson: "" }]);
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

  const handleDateConfirm = (date, callback) => {
    console.log("A date has been picked: ", date);
    callback("date", moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  const sendUser = async (values) => {
    // console.log(values.heading == "");
    if (values.heading == "") {
      setErr("All fields are empty!");
      Alert.alert("Error", "Fields are empty ");
      return;
    }

    values.lessons = lessons;
    console.log(values);

    db.collection("lectionary")
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

  const createElements = () => {
    const elements = [];
    for (let i = 0; i < thecount; i++) {
      let lessonnew = "Lesson " + (i + 1);
      let passagenew = "Passage " + (i + 1);
      elements.push(
        <View>
          <Text>Entry {i + 1}</Text>
          <TextInput
            placeholder={lessonnew}
            placeholderTextColor="gray"
            onChangeText={(t) => {
              let temp = [...lessons];
              temp[i].title = t;
              setLessons(temp);
              console.log(lessons);
            }}
            value={lessons[i].title}
            style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
          />
          <TextInput
            placeholder={passagenew}
            placeholderTextColor="gray"
            onChangeText={(t) => {
              let temp = [...lessons];
              temp[i].lesson = t;
              setLessons(temp);
              console.log(lessons);
            }}
            value={lessons[i].lesson}
            style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
          />
        </View>
      );
    }

    return elements;
  };

  return (
    <ScrollView>
      <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Formik
          initialValues={{
            heading: "",
            date: moment().format("YYYY-MM-DD"),
          }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            setTheCount(1);
            let temp = [{ title: "", lesson: "" }];
            setLessons(temp);
            // console.log(values);
            sendUser(values);
            // uploadImage();
          }}
        >
          {(props) => (
            <View style={[t.mY8, t.wFull, t.pX3]}>
              <Text style={[t.text4xl, t.mB4, t.mX4, t.textCenter, t.fontBold]}>
                Add To Lectionary
              </Text>
              <Text style={[t.fontBold, t.text2xl, t.selfCenter]}>
                Date : {moment(props.values.date).format("MMMM YYYY")}
              </Text>
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
              <TextInput
                placeholder="Heading For The Month"
                placeholderTextColor="gray"
                onChangeText={props.handleChange("heading")}
                value={props.values.heading}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />

              {createElements()}

              <View
                style={[
                  t.mY2,
                  t.mX3,
                  t.flex,
                  t.flexRow,
                  t.itemsCenter,
                  t.justifyAround,
                ]}
              >
                <Button
                  title="Add"
                  color="#1B719E"
                  onPress={() => {
                    let temp = [...lessons];
                    let newone = { title: "", lesson: "" };
                    temp.push(newone);
                    setLessons(temp);
                    setTheCount(thecount + 1);
                  }}
                />
                <Button
                  title="Remove"
                  color="#1B719E"
                  onPress={() => {
                    let temp = [...lessons];
                    temp.pop();
                    setLessons(temp);
                    console.log(lessons);
                    setTheCount(thecount - 1);
                  }}
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
    </ScrollView>
  );
};

export default CreateNewLet;
