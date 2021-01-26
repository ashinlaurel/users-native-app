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
  ActivityIndicator
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { firestore } from "firebase";
import CheckBox from '@react-native-community/checkbox';

const CreateNewUser = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(
    "https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
  );
  const [houseName, setHouseName] = useState("");
  const [houseId, setHouseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFamilyHead, setIsFamilyHead] = useState(false)

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
      Alert.alert("Error", "A Name is requires ");
      return;
    }
    if (houseName == "" || houseId == "") {
      Alert.alert("Error", "House Name is requires ");
      return;
    }
    setLoading(true)
    let newId, URL;
    values.houseName = houseName;
    values.houseId = houseId;
    values.isFamilyHead=isFamilyHead;
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
          function () { },
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
                  setLoading(false)
                  Alert.alert("Member Created");
                })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  setLoading(false)
                  Alert.alert("Error");

                });
            });
          }
        );
      })
      .then(() => {
        console.log("here");
        db.collection("housenames").doc(houseId).update({
          members: firestore.FieldValue.arrayUnion({ name: values.name, id: newId })
        }).then(() => {
          console.log("House Name added")
          setHouseName("");
          setHouseId("");
        })
      })

      .catch((err) => {
        console.log(err.code);
        // return;
      });
  };

  return (
    <ScrollView>
    {loading?
    <ActivityIndicator style={[t.mY64]} animating={loading} size="large" />
    :
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
          initialValues={{
            name: "",
            age: "",
            address: "",
            job: "",
            phone: "",
            verified: 0,
          }}
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
              <View style={[t.mY2]}>
                <Button
                  title="Pick House Name"
                  color="gray"
                  onPress={() =>
                    navigation.navigate("HouseNameList", {
                      setHouseName: setHouseName,
                      setHouseId: setHouseId,
                      'hope': "HOPE"
                    })
                  }
                />
              </View>
              {houseName!==""?
              <View style={[t.mY2,t.pY2,t.pX3,t.bgGray200]}>
                <Text style={[t.fontSemibold,t.uppercase]}>House Name: {houseName}</Text>
              </View>
              :null}
              <View style={[t.flex,t.flexRow,t.mYAuto]}>
                  <Text style={[t.mYAuto,t.mT1]}>
              Family Head:</Text>

              <CheckBox
                  disabled={false}
                  value={isFamilyHead}
                  onValueChange={(newValue) => setIsFamilyHead(newValue)}
                />
                </View>

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
                  color="grey"
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    }
    </ScrollView>
  );
};

export default CreateNewUser;
