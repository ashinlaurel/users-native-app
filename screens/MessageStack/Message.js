import React from "react";
import { View, Text, Image, Platform, Linking } from "react-native";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const Message = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  //   const { name, age, address, job, phone, imgUrl } = route.params;
  // console.log(name);
  // ---------------------------------------------------------------------------------

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
            A Study Of The Gospel
          </Text>
          <Text style={[t.text2xl, t.textCenter, t.textGray800, t.pB2]}>
            20th August 2020
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
            <View style={[t.flex, t.flexCol, t.mX4]}>
              <Text style={[t.text3xl, t.fontBold, t.mB1]}>Heading</Text>
              <Text style={[t.textXl]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Message;
