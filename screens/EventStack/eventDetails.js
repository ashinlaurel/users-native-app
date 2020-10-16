import React, { useContext } from "react";
import { db } from "../../firebase/firebase";
import { View, Text, Image, Alert } from "react-native";
import { t } from "react-native-tailwindcss";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LoginContext } from "../../context/LoginContext";

const EventDetails = ({ route, navigation }) => {
  // console.log("hello");
  const { name, location, date, time, key } = route.params;
  const { role } = useContext(LoginContext);

  const handleDelete = () => {
    console.log(key);
    db.collection("events")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("Events List");
  };

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
          {role == 0 ? (
            <>
              <View style={[t.flex, t.flexRow, t.wFull, t.justifyAround]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Edit Event", route.params);
                  }}
                  style={[
                    t.bgBlue600,
                    t.mX10,
                    t.mY5,
                    t.roundedFull,
                    t.shadowMd,
                  ]}
                >
                  <Text
                    style={[
                      t.mX10,
                      t.mY2,
                      t.uppercase,
                      t.fontBold,
                      t.textWhite,
                    ]}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Are you sure you want to delete event permanently",
                      "",
                      [
                        {
                          text: "Yes",
                          onPress: () => handleDelete(),
                          style: "cancel",
                        },
                        { text: "No", onPress: () => console.log("No delete") },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={[
                    t.bgBlue600,
                    t.mX10,
                    t.mY5,
                    t.roundedFull,
                    t.shadowMd,
                  ]}
                >
                  <Text
                    style={[
                      t.mX10,
                      t.mY2,
                      t.uppercase,
                      t.fontBold,
                      t.textWhite,
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default EventDetails;
