import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";
import { Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrganisationDetails = ({ route, navigation }) => {
  // console.log("hello");
  const { name, address, email, phone, details } = route.params;
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
        <Text style={[t.textXl, t.textCenter]}>At {address}</Text>
        <Text style={[t.textXl, t.textCenter]}>Phone: {phone}</Text>
        <Text style={[t.textXl, t.textCenter]}>Email: {email}</Text>
        <Text style={[t.textXl, t.textCenter]}>Details: {details}</Text>
      </View>
      <View style={[t.mY2]}>
        <View style={[t.bgGray300, t.mX1, t.w40, t.roundedFull]}>
          <TouchableOpacity
            onPress={() => {
              // console.log(name);
              navigation.navigate("UpcomingEvents", { name });
            }}
          >
            <Text style={[t.textBase, t.mY2, t.mX1, t.textCenter]}>
              Upcoming Events
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrganisationDetails;
