import React, { useContext } from "react";
import { View, Text, Image, Alert } from "react-native";
import { t } from "react-native-tailwindcss";
import { db } from "../../firebase/firebase";
// import { Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
// import Ripple from "react-native-material-ripple";
import { LoginContext } from "../../context/LoginContext";

const OrganisationDetails = ({ route, navigation }) => {
  // console.log("hello");
  const { name, address, email, phone, details, key } = route.params;
  const { role } = useContext(LoginContext);

  const handleDelete = () => {
    console.log(key);
    db.collection("organisations")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("OrganisationsList");
  };
  return (
    <View
      style={[
        t.flex,
        t.itemsCenter,
        t.justifyCenter,
        t.mY0,
        t.mX3,
        t.mT5,
        t.mB20,
        t.bgGray100,
        t.rounded,
        t.pY5,
      ]}
    >
      <Text
        style={[t.text2xl, t.mY3, t.textCenter, t.fontBold, t.borderB, t.pY1]}
      >
        {name}
      </Text>

      <View style={[t.wFull]}>
        <View style={[t.flex, t.flexRow, t.pY2, t.mY1, t.pX5, t.flexWrap]}>
          <Entypo name="pin" size={24} color="grey" style={[t.mX2]} />
          <Text style={[t.textBase, t.fontBold]}>Location: </Text>

          <Text style={[t.textBase]}>{address}</Text>
        </View>

        <View style={[t.flex, t.flexRow, t.pY2, t.mY1, t.pX5, t.flexWrap]}>
          <Entypo name="phone" size={24} color="grey" style={[t.mX2]} />
          <Text style={[t.textBase, t.fontBold]}>Phone: </Text>

          <Text style={[t.textBase]}>{phone}</Text>
        </View>

        <View style={[t.flex, t.flexRow, t.pY2, t.mY1, t.pX5, t.flexWrap]}>
          <MaterialCommunityIcons
            name="email"
            size={24}
            color="grey"
            style={[t.mX2]}
          />
          <Text style={[t.textBase, t.fontBold]}>Email: </Text>
          <Text style={[t.textBase]}>{email}</Text>
        </View>
        <View style={[t.flex, t.flexRow, t.pY2, t.mY1, t.pX5, t.flexWrap]}>
          <Entypo name="edit" size={24} color="grey" style={[t.mX2]} />
          <Text style={[t.textBase, t.fontBold]}>Details: </Text>
          <Text style={[t.textBase]}>{details}</Text>
        </View>
      </View>

      <View style={[t.mY1, t.w40, t.mX10]}>
        <View style={[t.wFull, t.roundedLg, t.border]}>
          {/* <Ripple rippleContainerBorderRadius={20} rippleColor="pink"> */}
          <TouchableOpacity
            onPress={() => {
              // console.log(name);
              navigation.navigate("UpcomingEvents", { name });
            }}
          >
            <Text
              style={[
                t.textBlack,
                t.mY1,
                t.textCenter,
                t.fontBlack,
                t.textBase,
              ]}
            >
              Upcoming Events
            </Text>
          </TouchableOpacity>

          {/* </Ripple> */}
        </View>
      </View>
      {role == 0 ? (
        <>
          <View style={[t.flex, t.flexRow, t.justifyAround, t.pL1]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditOrg", route.params);
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
                  "Are you sure you want to delete this organisation permanently ?",
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
  );
};

export default OrganisationDetails;
