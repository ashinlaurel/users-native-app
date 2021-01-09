import React, { useContext } from "react";
import { View, Text, Image, Platform, Linking, Alert } from "react-native";
import { db } from "../../firebase/firebase";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { LoginContext } from "../../context/LoginContext";

const Message = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { mainheading, subheading, content, key } = route.params;

  const { role } = useContext(LoginContext);

  // console.log(name);
  // ---------------------------------------------------------------------------------
  const handleDelete = () => {
    console.log(key);
    db.collection("messages")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("Messages");
  };
  return (
    <ScrollView>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,

          t.mX10,
          t.mT24,
          t.bgGray400,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB2, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                uri:
                  "https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              }}
              style={[
                t.border4,
                t.borderWhite,
                t.w24,
                t.h24,
                t.roundedFull,
                t.overflowHidden,
                t.mX4,
                t._mT20,
              ]}
            />
          </View>

          <Text
            style={[t.text3xl, t.textCenter, t.pT1, t.textGray900, t.fontBold]}
          >
            {mainheading}
          </Text>
          <Text style={[t.textLg, t.textCenter, t.textGray800, t.pB2]}>
            {moment().format("dddd, MMMM Do YYYY ")}
          </Text>
          {role == 0 ? (
            <>
              <View style={[t.flex, t.flexRow, t.justifyAround, t.pL1]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Edit Message", route.params);
                  }}
                  style={[t.bgBlue600, t.mX1, t.mT3, t.roundedLg, t.shadowMd]}
                >
                  <Text
                    style={[
                      t.mX4,
                      t.mY1,
                      t.uppercase,
                      t.fontSemibold,
                      t.textWhite,
                      t.textXs,
                    ]}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Are you sure you want to delete this message permanently ?",
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
                  style={[t.bgBlue600, t.mX1, t.mT3, t.roundedLg, t.shadowMd]}
                >
                  <Text
                    style={[
                      t.mX4,
                      t.mY1,
                      t.uppercase,
                      t.fontSemibold,
                      t.textWhite,
                      t.textXs,
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
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
        <View style={[t.wFull]}>
          <View style={[]}>
            <View style={[t.flex, t.flexCol, t.mX4]}>
              <Text style={[t.textXl, t.fontBold, t.mB1, t.borderB, t.pB1]}>
                {subheading}
              </Text>
              <Text style={[t.textBase, t.mT2]}>{content}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Message;
