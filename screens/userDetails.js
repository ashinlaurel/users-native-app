import React from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";

const UserDetails = ({ navigation }) => {
  console.log("hello");
  return (
    <View
      style={[
        t.flex,
        t.itemsCenter,
        t.justifyCenter,
        t.mY10,
        t.mX8,
        t.p5,
        t.bgGray300,
        t.rounded,
      ]}
    >
      <View>
        <Text style={[t.textXl]}>Name: {navigation.getParam("name")}</Text>
        <Text style={[t.textXl]}>Age: {navigation.getParam("age")}</Text>
        <Text style={[t.textXl]}>
          Address: {navigation.getParam("address")}
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;
