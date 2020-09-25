import React from "react";
import { View, Text, Image, Platform, Linking, Alert } from "react-native";
import { db } from "../../firebase/firebase";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

const Message = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { mainheading, subheading, content, key } = route.params;
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
          t.mY0,
          t.mX2,
          t.mT40,
          t.bgBlue300,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                uri:
                  "https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
            style={[t.text5xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >
            {mainheading}
          </Text>
          <Text style={[t.text2xl, t.textCenter, t.textGray800, t.pB2]}>
            {moment().format("dddd, MMMM Do YYYY ")}
          </Text>
          <View style={[t.flex, t.flexRow, t.wFull, t.justifyAround]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Edit Message", route.params);
              }}
              style={[t.bgBlue600, t.mX10, t.mT3, t.roundedFull, t.shadowMd]}
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
              style={[t.bgBlue600, t.mX10, t.mT3, t.roundedFull, t.shadowMd]}
            >
              <Text
                style={[t.mX10, t.mY2, t.uppercase, t.fontBold, t.textWhite]}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
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
            <View style={[t.flex, t.flexCol, t.mX4]}>
              <Text style={[t.text3xl, t.fontBold, t.mB1]}>{subheading}</Text>
              <Text style={[t.textXl]}>{content}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Message;
