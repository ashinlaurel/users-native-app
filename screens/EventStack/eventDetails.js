import React from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";

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
        t.bgWhite,
        // t.roundedFull,
        t.shadowXl,
        t.rounded,
        t.pY10,
      ]}
    >
      <View style={[]}>
        <View>
          <Entypo
            name="bell"
            size={64}
            color="#e80e5a"
            style={[t.mT4, t.textCenter, t.pY2]}
          />
        </View>

        <Text style={[t.text5xl, t.mY3, t.textCenter]}>{name}</Text>

        <View style={[]}>
          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="pin" size={32} color="grey" style={[t.mX2]} />

            <Text style={[t.textBase]}>{location}</Text>
          </View>

          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="calendar" size={32} color="grey" style={[t.mX2]} />

            <Text style={[t.textBase]}>
              {moment(date).format("dddd, MMMM Do YYYY ")}
            </Text>
          </View>

          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={32}
              color="grey"
              style={[t.mX2]}
            />

            <Text style={[t.textBase]}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventDetails;
