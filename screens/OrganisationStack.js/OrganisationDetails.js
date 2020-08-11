import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";
import { Button } from "galio-framework";

const OrganisationDetails = ({ route }) => {
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
        <View style={[t.mY2]}>
          <Button
            title="Upcoming Events"
            color="gray"
            onPress={() => {
              console.log(name);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OrganisationDetails;
