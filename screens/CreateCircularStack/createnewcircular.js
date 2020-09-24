import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase";
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
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native-gesture-handler";

const CreateNewCircular = () => {
  const [imageUri, setImageUri] = useState(
    "https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
  );
  const [docUri, setDocUri] = useState("");

  const selectDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.cancelled) {
        // console.log(result.uri);
        setDocUri(result.uri);
        // console.log(docUri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const sendDoc = async (values) => {
    if (values.title == "") {
      Alert.alert("Error", "A Name is necessary ");
      return;
    }
    let newId, URL;
    db.collection("circulars")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        newId = ref.id;
        return fetch(docUri);
      })
      .then((res) => {
        // console.log(res.blob);
        return res.blob();
      })
      .then((blob) => {
        let refer = storage.ref().child(`circulars/${newId}`).put(blob);
        refer.on(
          "state_changed",
          function () {},
          function (error) {
            console.log(error);
          },
          function () {
            console.log("complete");
            refer.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log("File available at hererre", downloadURL);
              URL = downloadURL;
              db.collection("circulars")
                .doc(newId)
                .update({ docUrl: URL })
                .then(function () {
                  console.log("Document successfully updated!");
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            });
          }
        );
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
    <ScrollView>
      <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <View
          style={[t.mT4, t.flexCol, t.flex, t.itemsCenter, t.justifyCenter]}
        >
          <View style={[t.mY2, t.roundedFull, t.overflowHidden]}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200 }}
              />
            ) : null}
          </View>
          <View style={[t.flexRow, t.justifyCenter, t.itemsCenter, t.mT2]}>
            <TouchableOpacity style={[t.mX2]}>
              <Button
                title="Select PDF"
                onPress={selectDocument}
                color="#E91E63"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Formik
          initialValues={{
            title: "",
          }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            // console.log(values);
            sendDoc(values);
            // uploadImage();
          }}
        >
          {(props) => (
            <View style={[t.mY4, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="black"
                onChangeText={props.handleChange("title")}
                value={props.values.title}
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

export default CreateNewCircular;
