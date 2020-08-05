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
        t.mX2,
        t.mT48,
        t.mB20,
        t.bgGray100,
        t.rounded,
      ]}
    >
      <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
        <View>
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
        </View>
        <Text style={[t.text5xl, t.textCenter, t.pY2]}>
          {navigation.getParam("name")}
        </Text>
        <Text style={[t.textXl, t.textCenter]}>
          Age: {navigation.getParam("age")}
        </Text>
        <Text style={[t.textXl, t.textCenter]}>
          Occupation: {navigation.getParam("job")}
        </Text>
        <Text style={[t.textXl, t.textCenter]}>
          Address: {navigation.getParam("address")}
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;
