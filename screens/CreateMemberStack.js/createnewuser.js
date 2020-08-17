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
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

const CreateNewUser = () => {
  const [imageUri, setImageUri] = useState(
    "https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
  );

  const selectPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const takePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    getPermissionAsync();
    return () => {
      console.log("Permission call");
    };
  }, []);

  let getPermissionAsync = async () => {
    try {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const sendUser = async (values) => {
    if (values.name == "") {
      Alert.alert("Error", "A Name is necessary ");
      return;
    }
    let newId, URL;
    db.collection("dirusers")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        newId = ref.id;
        return fetch(imageUri);
      })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        let refer = storage.ref().child(`/images/dir/${newId}`).put(blob);
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
              db.collection("dirusers")
                .doc(newId)
                .update({ imgUrl: URL })
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
                title="Gallery"
                onPress={() => {
                  selectPicture();
                }}
                color="#1B719E"
              />
            </TouchableOpacity>
            <TouchableOpacity style={[t.mX2]}>
              <Button title="Camera" onPress={takePicture} color="#E91E63" />
            </TouchableOpacity>
          </View>
        </View>
        <Formik
          initialValues={{ name: "", age: "", address: "", job: "", phone: "" }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            // console.log(values);
            sendUser(values);
            // uploadImage();
          }}
        >
          {(props) => (
            <View style={[t.mY4, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="black"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />

              <TextInput
                placeholder="Age"
                placeholderTextColor="black"
                onChangeText={props.handleChange("age")}
                value={props.values.age}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="black"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Address"
                placeholderTextColor="black"
                onChangeText={props.handleChange("address")}
                value={props.values.address}
                style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
              />
              <TextInput
                placeholder="Job"
                placeholderTextColor="black"
                onChangeText={props.handleChange("job")}
                value={props.values.job}
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

export default CreateNewUser;
