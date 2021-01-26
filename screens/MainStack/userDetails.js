import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Linking,
  Button,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../firebase/firebase";

import { DataContext } from "../../context/DataContext";
import Login from "../LoginStack/Login";
import { LoginContext } from "../../context/LoginContext";
import { firestore } from "firebase";

const UserDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const {
    name,
    age,
    address,
    job,
    phone,
    imgUrl,
    key,
    houseName,
    houseId,
  } = route.params;

  const { role } = useContext(LoginContext);

  const { filterusers, setFilterUsers } = useContext(DataContext);
  const [houseMembers, sethouseMembers] = useState([]);
  // console.log(name);
  // ---------------------------------------------------------------------------------
  //delete
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleRefresh();
    });
    return unsubscribe;
  }, []);
  const handleRefresh = async () => {
    console.log(houseId);
    const eventsRef = db.collection("housenames").doc(houseId);
    const doc = await eventsRef.get();
    await sethouseMembers(doc.data().members);
  };

  const handleDelete = () => {
    // return;
    console.log(key);
    db.collection("dirusers")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    deletefromHouse();

    navigation.navigate("Members");
  };

  const deletefromHouse = async () => {
    try {
      let house = await db.collection("housenames").doc(houseId).get();
      console.log(house.data().members.length);

      let members = await house.data().members;
      let ind = 0;
      for (let i = 0; i < members.length; i++) {
        if (members[i].id == key) ind = i;
      }
      if (members.length > 1) {
        await db
          .collection("housenames")
          .doc(houseId)
          .update({
            members: firestore.FieldValue.arrayRemove(members[ind]),
          });
      } else {
        await db.collection("housenames").doc(houseId).delete();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Calling code
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <ScrollView>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,
          t.mY0,
          t.mX4,
          t.mT40,
          t.bgGray400,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                // uri: imgUrl, 
                      uri: `${imgUrl!=""?`${imgUrl}`:`https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png`}`,
              }}
              style={[
                t.border4,
                t.borderWhite,
                t.w48,
                t.h48,
                t.roundedFull,
                t.overflowHidden,
                t.mX4,
                t._mT32,
              ]}
            />
          </View>
          <Text
            style={[t.text3xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >
            {name}
          </Text>

          <Text
            style={[
              t.textXl,
              t.textCenter,
              t.pT1,
              t.textGray800,
              t.fontSemibold,
            ]}
          >
            {houseName}
          </Text>
          {/* <Text style={[t.textXl, t.textCenter, t.textGray800, t.pB2]}>
            Address:{address}
          </Text> */}
          {/* <Text style={[t.textXl, t.textCenter]}>Age: {age}</Text>
        <Text style={[t.textXl, t.textCenter]}>Occupation: {job}</Text>
        <Text style={[t.textXl, t.textCenter]}>Address: {address}</Text> */}
        </View>
      </View>
      {/* Details---------------------------- */}
      <View
        style={[
          t.flex,
          t.itemsStart,
          t.justifyStart,
          t.mX2,
          t.bgGray200,
          t.mY4,
        ]}
      >
        <View style={[t.wFull]}>
          <View style={[]}>
            <View
              style={[
                t.flex,
                t.flexRow,
                t.pY2,
                t.mY1,
                t.bgWhite,
                t.shadowMd,
                t.pX5,
                t.flexWrap,
                t.mX2,
                t.roundedL,
              ]}
            >
              <Entypo name="pin" size={24} color="grey" style={[t.mX2]} />
              <Text style={[t.textBase, t.fontBold]}>Occupation: </Text>
              <Text style={[t.textBase]}>{job}</Text>
            </View>

            <View
              style={[
                t.flex,
                t.flexRow,
                t.pY2,
                t.mY1,
                t.bgWhite,
                t.shadowMd,
                t.pX5,
                t.flexWrap,
                t.mX2,
                t.roundedL,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  dialCall();
                }}
                style={[t.flex, t.flexRow]}
              >
                <Entypo name="phone" size={24} color="grey" style={[t.mX2]} />

                <Text style={[t.textBase, t.fontBold]}>Phone: </Text>
                <Text style={[t.textBase]}>{phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              t.flex,
              t.flexRow,
              t.pY2,
              t.mY1,
              t.bgWhite,
              t.shadowMd,
              t.pX5,
              t.flexWrap,
              t.mX2,
              t.roundedL,
            ]}
          >
            <Entypo name="calendar" size={24} color="grey" style={[t.mX2]} />
            <Text style={[t.textBase, t.fontBold]}>Family Members: </Text>
            <Text style={[t.textBase]}>
              {houseMembers.map((mem) => (
                <> {mem.name !== name ? <>{mem.name}</> : null}</>
              ))}
            </Text>
          </View>
          <View
            style={[
              t.flex,
              t.flexRow,
              t.pY2,
              t.mY1,
              t.bgWhite,
              t.shadowMd,
              t.pX5,
              t.flexWrap,
              t.mX2,
              t.roundedL,
            ]}
          >
            <Entypo name="calendar" size={24} color="grey" style={[t.mX2]} />
            <Text style={[t.textBase, t.fontBold]}>Address: </Text>
            <Text style={[t.textBase]}>{address}</Text>
          </View>
        </View>
        {role == 0 ? (
          <>
            <View
              style={[
                t.flex,
                t.flexRow,
                t.justifyCenter,
                t.pL1,
                t.wFull,
                t.mT4,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditMember", route.params);
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
                    "Are you sure you want to delete user permanently",
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
    </ScrollView>
  );
};

export default UserDetails;
