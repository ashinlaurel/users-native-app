import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { View, FlatList } from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";

const BibleInitial = ({ navigation }) => {
  const [events, setEvents] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [search, setSearch] = useState("");

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <View style={[t.pY3]}>
          <View style={[t.mY2]}>
            <Card
              title="English"
              iconName="book"
              backgroundColor="red"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              titleColor="black"
              // content={`On ${moment(item.date).format(
              //   "dddd, MMMM Do YYYY "
              // )} at ${item.time}`}
              // topRightText={item.location}
              onPress={() => {
                navigation.navigate("Books");
              }}
              // topRightText={item.location}
              // bottomRightText={`On ${item.date} at ${item.time}`}
              // content={`On ${item.date} at ${item.time}`}
            />
          </View>
          <View style={[t.mY2]}>
            <Card
              title="Malayalam"
              iconName="book"
              backgroundColor="red"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              titleColor="black"
              // content={`On ${moment(item.date).format(
              //   "dddd, MMMM Do YYYY "
              // )} at ${item.time}`}
              // topRightText={item.location}
              onPress={() => {
                navigation.navigate("MalBooks");
              }}
              // topRightText={item.location}
              // bottomRightText={`On ${item.date} at ${item.time}`}
              // content={`On ${item.date} at ${item.time}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BibleInitial;
