import React, { useState, useEffect } from "react";
import { rdb } from "../../firebase/firebase";

import { View, Text, FlatList } from "react-native";
import { t } from "react-native-tailwindcss";

// import malbible from "../../assets/malbiblejs";

const MalVerses = ({ navigation, route }) => {
  const [verses, setVerses] = useState([]);
  // const [filterusers, setFilterUsers] = useState(users);
  const { booknum, vnum, book } = route.params;
  console.log(booknum, vnum);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log("BIBR", bible.Book[0].Chapter[1].Verse[1]);
    // let temp = malbible.Book[booknum - 1].Chapter[vnum - 1].Verse.map(
    //   (verse) => {
    //     return verse;
    //   }
    // );
    // setVerses(temp);
    
    rdb.ref(`/Book/${booknum-1}/Chapter/${vnum-1}/Verse`).once('value').then(function(snapshot) {
      // console.log(snapshot.val());
      setVerses(snapshot.val());
      // ...
    });
    
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
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT10]}>
      <Text style={[t.text3xl, t.fontBold, t.mY2]}>
        {book}-{vnum}
      </Text>

      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.Verseid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={verses}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item, index }) => (
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
              <Text style={[t.textLg, t.fontBold]}>{index + 1}</Text>
              <View style={[]}>
                <Text style={[t.textLg, t.fontSemibold, t.mX2, t.mL6, t.mR10]}>
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

export default MalVerses;
