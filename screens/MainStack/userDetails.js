import React from "react";
import { View, Text, Image, Platform, Linking } from "react-native";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const UserDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { name, age, address, job, phone, imgUrl } = route.params;
  // console.log(name);
  // ---------------------------------------------------------------------------------

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
            style={[t.text5xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >
            {name}
          </Text>
          <Text style={[t.text2xl, t.textCenter, t.textGray800, t.pB2]}>
            {address}
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
      </View>
    </ScrollView>
  );
};

export default UserDetails;
