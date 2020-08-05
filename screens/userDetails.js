import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";

const UserDetails = ({ navigation }) => {
  console.log("hello");
  return (
    <View
      style={[
        t.flex,
        t.itemsCenter,
        t.justifyCenter,
        t.mY0,
        t.mX8,
        t.mT48,
        t.mB20,
        t.bgBlue100,
        t.rounded,
      ]}
    >
      <View style={[t.textCenter, t.pB10]}>
        <Image
          source={{
            uri: navigation.getParam("imgUrl"),
          }}
          style={[
            t.w48,
            t.h48,
            t.roundedFull,
            t.overflowHidden,
            t.mX4,
            t._mT32,
          ]}
        />
        <Text style={[t.text5xl, t.textCenter]}>
          {navigation.getParam("name")},{navigation.getParam("age")}
        </Text>
        <Text style={[t.textXl, t.textCenter]}>
          Address: {navigation.getParam("address")}
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;
