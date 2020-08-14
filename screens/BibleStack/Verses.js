import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";

import { View, Text, FlatList } from "react-native";
import { t } from "react-native-tailwindcss";

import bible from "../../assets/biblejs";

const Verses = ({ navigation }) => {
  const [verses, setVerses] = useState([]);
  // const [filterusers, setFilterUsers] = useState(users);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log("BIBR", bible.Book[0].Chapter[1].Verse[1]);
    let temp = bible.Book[0].Chapter[1].Verse.map((verse) => {
      return verse;
    });
    setVerses(temp);
  }, []);

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
          keyExtractor={(item) => item.Verseid}
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
              {/* <Text style={[t.textLg, t.fontBold]}>{item.Verseid}</Text> */}
              <View style={[]}>
                <Text style={[t.textLg, t.fontSemibold, t.mX2, t.mL3, t.mR16]}>
                  {item.Verse}
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
