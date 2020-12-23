import React, { useContext } from "react";
import { View, Text, Image, Platform, Linking, Alert } from "react-native";
import { db } from "../../firebase/firebase";
import { t } from "react-native-tailwindcss";
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import moment from "moment";
import { LoginContext } from "../../context/LoginContext";

const LectDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { item,lectdetails } = route.params;

  const { role } = useContext(LoginContext);

  // console.log(name);
  // ---------------------------------------------------------------------------------
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
        }}
      />
    );
  };

  const handleDelete = () => {
    console.log(key);
    db.collection("messages")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("Messages");
  };
  return (
    <ScrollView>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,
          t.mY0,
          t.mX2,
          t.mT40,
          t.bgBlue300,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                uri:
                  "https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
            style={[t.text5xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >{item}
            {/* {moment(date).format("MMMM YYYY")} */}
          </Text>
          
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
        <View style={[]}>
          <View style={[]}>
            <View style={[t.flex, t.flexCol, t.mX4]}>
              <Text style={[t.textXl, t.fontBold]}>{item}</Text>
            </View>
          </View>
        </View>
        <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
          {/* <FlatList
            numColumns={1}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={{item}}
            // refreshing={loading}
            // onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[]}
                onPress={() => {
                  console.log(item);
                  // handlePress(item);
                  //   navigation.navigate("UserDetails", item);
                }}
              >
                <View
                  style={[
                    t.pY3,
                    t.wFull,
                    t.textCenter,
                    t.flexRow,
                    t.itemsCenter,
                    t.justifyStart,
                  ]}
                >
                  <View
                    style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}
                  >
                    <Text
                      style={[t.textBase, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[t.textBase, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                    >
                      {item.lesson}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              // Galio Card--------------------------------------------
            )}
            ItemSeparatorComponent={renderSeparator}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default LectDetails;
