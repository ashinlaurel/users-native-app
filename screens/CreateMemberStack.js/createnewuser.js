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
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const CreateNewUser = () => {
  const [imageUri, setImageUri] = useState(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  );

  const selectPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
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
        quality: 1,
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

  // const sendUser = async (values) => {
  //   let newId, URL;
  //   db.collection("dirusers")
  //     .add(values)
  //     .then((ref) => {
  //       console.log("Added document with ID: ", ref.id);
  //       newId = ref.id;
  //       fetch(imageUri);
  //     })
  //     .then((res) => {
  //       res.blob();
  //     })
  //     .then((blob) => {
  //       let refer = storage.ref().child(`images/dir/${ref.id}`).put(blob);
  //       refer.on(
  //         "state_changed",
  //         function () {},
  //         function (error) {
  //           console.log(error);
  //         },
  //         function () {
  //           console.log("complete");
  //           uploadTask.snapshot.ref.getDownloadURL();
  //         }
  //       );
  //     })
  //     .then(function (downloadURL) {
  //       console.log("File available at", downloadURL);
  //       URL = downloadURL;
  //     })
  //     .catch((err) => {
  //       console.log(err.code);
  //       return;
  //     });

  //   db.collection("dirusers")
  //     .doc(newId)
  //     .update({ imgUrl: URL })
  //     .then(function () {
  //       console.log("Document successfully updated!");
  //     })
  //     .catch(function (error) {
  //       // The document probably doesn't exist.
  //       console.error("Error updating document: ", error);
  //     });

  //   // const res = await db.collection("test").doc().set(values);
  //   // console.log(res);
  // };

  return (
    <View style={[t.flexCol, t.itemsCenter, t.justifyCenter]}>
      <View style={[t.mY2, t.flexCol, t.flex, t.itemsCenter, t.justifyCenter]}>
        <View style={[t.mY2, t.roundedFull, t.overflowHidden]}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            />
          ) : null}
        </View>
        <View style={[t.flexRow, t.justifyCenter, t.itemsCenter]}>
          <TouchableOpacity style={[t.mX2]}>
            <Button
              title="Gallery"
              onPress={() => {
                selectPicture();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[t.mX2]}>
            <Button title="Camera" onPress={takePicture} />
          </TouchableOpacity>
        </View>
      </View>
      <Formik
        initialValues={{ name: "", age: "", address: "", job: "" }}
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
  );
};

export default CreateNewUser;