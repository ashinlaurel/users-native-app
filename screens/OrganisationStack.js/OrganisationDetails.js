import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";
import { Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
import Ripple from "react-native-material-ripple";

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
        t.mX1,
        t.mT10,
        t.mB20,
        t.bgGray100,
        t.rounded,
        t.pY10,
      ]}
    >
      {/* <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
        <Text style={[t.text5xl, t.textCenter, t.pY2]}>{name}</Text>
        <Text style={[t.textBase, t.textCenter]}>At {address}</Text>
        <Text style={[t.textXl, t.textCenter]}>Phone: {phone}</Text>
        <Text style={[t.textXl, t.textCenter]}>Email: {email}</Text>
        <Text style={[t.textXl, t.textCenter]}>Details: {details}</Text>
      </View> */}

      <View>
        <Entypo
          name="bell"
          size={64}
          color="#e80e5a"
          style={[t.mT4, t.textCenter]}
        />
      </View>

      <Text style={[t.text5xl, t.mY3, t.textCenter]}>{name}</Text>

      <View style={[]}>
        <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
          <Entypo name="pin" size={32} color="grey" style={[t.mX2]} />

          <Text style={[t.textBase]}>{address}</Text>
        </View>

        <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
          <Entypo name="phone" size={32} color="grey" style={[t.mX2]} />

          <Text style={[t.textBase]}>{phone}</Text>
        </View>

        <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
          <MaterialCommunityIcons
            name="email"
            size={32}
            color="grey"
            style={[t.mX2]}
          />

          <Text style={[t.textBase]}>{email}</Text>
        </View>
        <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
          <Entypo name="edit" size={32} color="grey" style={[t.mX2]} />

          <Text style={[t.textBase]}>{details}</Text>
        </View>
      </View>

      <View style={[t.mY2]}>
        <View style={[t.bgPink600, t.mX1, t.w40, t.roundedFull, t.shadowLg]}>
          {/* <Ripple rippleContainerBorderRadius={20} rippleColor="pink"> */}
          <TouchableOpacity
            onPress={() => {
              // console.log(name);
              navigation.navigate("UpcomingEvents", { name });
            }}
          >
            <Text
              style={[
                t.textBase,
                t.textWhite,
                t.mY2,
                t.mX1,
                t.pY1,
                t.textCenter,
                t.fontBlack,
              ]}
            >
              Upcoming Events
            </Text>
          </TouchableOpacity>
          {/* </Ripple> */}
        </View>
      </View>
    </View>
  );
};

export default OrganisationDetails;
