import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";

import { View, Text, FlatList } from "react-native";
import { t } from "react-native-tailwindcss";

const Verses = ({ navigation }) => {
  const [verses, setVerses] = useState([
    {
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      uid: "1",
    },
    {
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      uid: "2",
    },
    {
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      uid: "3",
    },
  ]);
  // const [filterusers, setFilterUsers] = useState(users);
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter]}>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={verses}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   style={[]}
            //   onPress={() => {
            //     // console.log(item);
            //     // handlePress(item);
            //     navigation.navigate("Chapters", item);
            //   }}
            // >
            <View
              style={[
                t.pX10,
                t.wFull,
                t.textCenter,
                t.flexRow,
                t.itemsStart,
                t.justifyStart,
                t.pY4,
              ]}
            >
              <Text style={[t.textLg, t.fontBold]}>{item.uid}</Text>
              <View style={[]}>
                <Text style={[t.textLg, t.fontSemibold, t.mX2, t.mL3, t.mR16]}>
                  {item.name}
                </Text>
              </View>
            </View>
            // </TouchableOpacity>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default Verses;
