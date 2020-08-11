import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";

const UserDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { name, age, address, job, imgUrl } = route.params;
  // console.log(name);
  // ---------------------------------------------------------------------------------

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
              uri: imgUrl,
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
        <Text style={[t.text5xl, t.textCenter, t.pY2]}>{name}</Text>
        <Text style={[t.textXl, t.textCenter]}>Age: {age}</Text>
        <Text style={[t.textXl, t.textCenter]}>Occupation: {job}</Text>
        <Text style={[t.textXl, t.textCenter]}>Address: {address}</Text>
      </View>
    </View>
  );
};

export default UserDetails;
