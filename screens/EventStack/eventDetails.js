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
        // t.itemsCenter,
        // t.justifyCenter,
        t.mY0,
        t.pX10,
        t.mT4,
        t.mX2,
        t.mB20,
        t.bgWhite,
        t.rounded,
        // t.shadowXl,
        // t.rounded,
        t.pT2,
        t.pB10,
      ]}
    >
      <View style={[]}>
        <View
          style={[
            t.flex,
            t.itemsCenter,
            t.justifyCenter,
            t.mX2,
            t.mT24,
            t.bgGray300,
            t.rounded,
            t.pB5,
          ]}
        >
          <View style={[t.textCenter, t.pB2, t.flexCol, t.itemsCenter]}>
            <View>
              <Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg?auto=compress&cs=tinysrgb&h=200",
                }}
                style={[
                  t.border4,
                  t.borderWhite,
                  t.w24,
                  t.h24,
                  t.roundedFull,
                  t.overflowHidden,
                  t.mX4,
                  t._mT20,
                ]}
              />
            </View>
            <Text
              style={[
                t.text3xl,
                t.textCenter,
                t.pY1,
                t.textGray900,
                t.fontBold,
                t.borderB,
              ]}
            >
              {name}
            </Text>
          </View>
        </View>

        {/* <View>
          <Entypo
            name="bell"
            size={24}
            color="#e80e5a"
            style={[ t.textCenter, t.pY2]}
          />
        </View> */}

        {/* <Text style={[t.textXl, t.mY3, t.textCenter,t.fontSemibold]}>{name}</Text> */}

        <View style={[]}>
          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="pin" size={24} color="grey" style={[t.mX2]} />

            <Text>{location}</Text>
          </View>

          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="calendar" size={24} color="grey" style={[t.mX2]} />

            <Text>{moment(date).format("dddd, MMMM Do YYYY ")}</Text>
          </View>

          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color="grey"
              style={[t.mX2]}
            />

            <Text>{time}</Text>
          </View>
          {role == 0 ? (
            <>
              <View style={[t.flex, t.flexRow, t.justifyCenter, t.pL1]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Edit Event", route.params);
                  }}
                  style={[t.mX1, t.mT3, t.roundedLg, t.border]}
                >
                  <Text
                    style={[
                      t.mX4,
                      t.mY1,
                      t.uppercase,
                      t.fontSemibold,
                      t.textBlack,
                      t.textXs,
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
                  style={[t.mX1, t.mT3, t.roundedLg, t.border]}
                >
                  <Text
                    style={[
                      t.mX4,
                      t.mY1,
                      t.uppercase,
                      t.fontSemibold,
                      t.textBlack,
                      t.textXs,
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
