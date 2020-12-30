import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase";
import { Ionicons } from "@expo/vector-icons";
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
    "https://www.pngkey.com/png/detail/98-981538_icono-pdf-vector-pdf-icon-free.png"
  );
  const [docUri, setDocUri] = useState("");
  const [thedoc, setTheDoc] = useState([]);
  const [docstatus, setDocStatus] = useState(0);

  const selectDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.cancelled) {
        // console.log(result.uri);
        setDocUri(result.uri);
        setTheDoc(result);
        setDocStatus(1);
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
                  Alert.alert("Circular uploaded");
                  setTheDoc([]);
                  setDocUri("");
                  setDocStatus(0);
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

        {docstatus == 1 ? (
          <View
            style={[t.mT4, t.flex, t.flexRow, t.justifyBetween, t.wFull, t.pX4]}
          >
            <View>
              <Text style={[t.fontSemibold, t.textLg]}>
                PDF Name : {thedoc.name}
              </Text>
              <Text style={[t.fontSemibold, t.textLg]}>
                Size : {thedoc.size / 1000} KB
              </Text>
            </View>
            <View>
              <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </View>
          </View>
        ) : null}
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
