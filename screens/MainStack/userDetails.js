import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Linking,
  Button,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../firebase/firebase";
import { DataContext } from "../../context/DataContext";
import Login from "../LoginStack/Login";
import { LoginContext } from "../../context/LoginContext";

const UserDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { name, age, address, job, phone, imgUrl, key ,houseName} = route.params;
  

  const { role } = useContext(LoginContext);

  const { filterusers, setFilterUsers } = useContext(DataContext);
  // console.log(name);
  // ---------------------------------------------------------------------------------
  //delete
  const handleDelete = () => {
    console.log(key);
    db.collection("dirusers")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("Members");
  };
  // Calling code
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <ScrollView>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,
          t.mY0,
          t.mX2,
          t.mT40,
          t.bgRed300,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={[
                t.border4,
                t.borderWhite,
                t.w48,
                t.h48,
                t.roundedFull,
                t.overflowHidden,
                t.mX4,
                t._mT32,
              ]}
            />
          </View>
          <Text
            style={[t.text4xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >
            {name}
          </Text>
          <Text
            style={[t.text2xl, t.textCenter, t.pT1, t.textGray800, t.fontSemibold]}
          >
             {houseName}
          </Text>
          <Text style={[t.textXl, t.textCenter, t.textGray800, t.pB2]}>
            Address:{address}
          </Text>
          {/* <Text style={[t.textXl, t.textCenter]}>Age: {age}</Text>
        <Text style={[t.textXl, t.textCenter]}>Occupation: {job}</Text>
        <Text style={[t.textXl, t.textCenter]}>Address: {address}</Text> */}
        </View>
      </View>
      {/* Details---------------------------- */}
      <View
        style={[
          t.flex,
          t.itemsStart,
          t.justifyStart,
          t.mX2,
          t.bgGray200,
          t.mY4,
        ]}
      >
        <View style={[]}>
          <View style={[]}>
            <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
              <Entypo name="pin" size={32} color="grey" style={[t.mX2]} />

              <Text style={[t.textXl]}>Occupation: {job}</Text>
            </View>

            <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
              <Entypo name="calendar" size={32} color="grey" style={[t.mX2]} />

              <Text style={[t.textXl]}>Age: {age}</Text>
            </View>

            <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
              <TouchableOpacity
                onPress={() => {
                  dialCall();
                }}
                style={[t.flex, t.flexRow]}
              >
                <Entypo name="phone" size={32} color="grey" style={[t.mX2]} />

                <Text style={[t.textXl]}>Phone: {phone}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {role == 0 ? (
          <>
            <View style={[t.flex, t.flexRow, t.wFull, t.justifyAround]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditMember", route.params);
                }}
                style={[t.bgBlue600, t.mX10, t.mY5, t.roundedFull, t.shadowMd]}
              >
                <Text
                  style={[t.mX10, t.mY2, t.uppercase, t.fontBold, t.textWhite]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Are you sure you want to delete user permanently",
                    "",
                    [
                      {
                        text: "Yes",
                        onPress: () => handleDelete(),
                        style: "cancel",
                      },
                      { text: "No", onPress: () => console.log("No delete") },
                    ],
                    { cancelable: false }
                  );
                }}
                style={[t.bgBlue600, t.mX10, t.mY5, t.roundedFull, t.shadowMd]}
              >
                <Text
                  style={[t.mX10, t.mY2, t.uppercase, t.fontBold, t.textWhite]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default UserDetails;
