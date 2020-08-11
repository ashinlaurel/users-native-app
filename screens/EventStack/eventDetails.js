import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";

const EventDetails = ({ route }) => {
  // console.log("hello");
  const { name, location, date, time } = route.params;
  return (
    <View
      style={[
        t.flex,
        t.itemsCenter,
        t.justifyCenter,
        t.mY0,
        t.mX2,
        t.mT10,
        t.mB20,
        t.bgGray100,
        t.rounded,
        t.pY10,
      ]}
    >
      <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
        <Text style={[t.text5xl, t.textCenter, t.pY2]}>{name}</Text>
        <Text style={[t.textXl, t.textCenter]}>At {location}</Text>
        <Text style={[t.textXl, t.textCenter]}>{`On ${date} at ${time}`}</Text>
      </View>
    </View>
  );
};

export default EventDetails;
