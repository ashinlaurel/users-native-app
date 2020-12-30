import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { View, Text, Button, FlatList, TouchableOpacity,ImageBackground } from "react-native";
import { t } from "react-native-tailwindcss";
import bg from "../../assets/bg.png";

const MalBooks = ({ navigation }) => {
  const [old, setOld] = useState(true);

  const [malbooks, setMalBooks] = useState([
    {
      num: 1,
      book: "ഉല്പത്തി",
    },
    {
      num: 2,
      book: "പുറപ്പാടു്",
    },
    {
      num: 3,
      book: "ലേവ്യപുസ്തകം",
    },
    {
      num: 4,
      book: "സംഖ്യാപുസ്തകം",
    },
    {
      num: 5,
      book: "ആവർത്തനം",
    },
    {
      num: 6,
      book: "യോശുവ",
    },
    {
      num: 7,
      book: "ന്യായാധിപന്മാർ",
    },
    {
      num: 8,
      book: "രൂത്ത്",
    },
    {
      num: 9,
      book: "ശമൂവേൽ-1",
    },
    {
      num: 10,
      book: "ശമൂവേൽ -2",
    },
    {
      num: 11,
      book: "രാജാക്കന്മാർ 1",
    },
    {
      num: 12,
      book: "രാജാക്കന്മാർ 2",
    },
    {
      num: 13,
      book: "ദിനവൃത്താന്തം 1",
    },
    {
      num: 14,
      book: "ദിനവൃത്താന്തം 2",
    },
    {
      num: 15,
      book: "എസ്രാ",
    },
    {
      num: 16,
      book: "നെഹെമ്യാവു",
    },
    {
      num: 17,
      book: "എസ്ഥേർ",
    },
    {
      num: 18,
      book: "ഇയ്യോബ്",
    },
    {
      num: 19,
      book: "സങ്കീർത്തനങ്ങൾ",
    },
    {
      num: 20,
      book: "സദൃശ്യവാക്യങ്ങൾ",
    },
    {
      num: 21,
      book: "സഭാപ്രസംഗി",
    },
    {
      num: 22,
      book: "ഉത്തമ ഗീതം",
    },
    {
      num: 23,
      book: "യെശയ്യാ",
    },
    {
      num: 24,
      book: "യിരേമ്യാവു",
    },
    {
      num: 25,
      book: "വിലാപങ്ങൾ",
    },
    {
      num: 26,
      book: "യേഹേസ്കേൽ",
    },
    {
      num: 27,
      book: "ദാനീയേൽ",
    },
    {
      num: 28,
      book: "ഹോശേയ",
    },
    {
      num: 29,
      book: "യോവേൽ",
    },
    {
      num: 30,
      book: "ആമോസ്",
    },
    {
      num: 31,
      book: "ഓബദ്യാവു",
    },
    {
      num: 32,
      book: "യോനാ",
    },
    {
      num: 33,
      book: "മീഖാ",
    },
    {
      num: 34,
      book: "നഹൂം",
    },
    {
      num: 35,
      book: "ഹബക്കൂക്‍",
    },
    {
      num: 36,
      book: "സെഫന്യാവു",
    },
    {
      num: 37,
      book: "ഹഗ്ഗായി",
    },
    {
      num: 38,
      book: "സെഖർയ്യാവു",
    },
    {
      num: 39,
      book: "മലാഖി",
    },
    {
      num: 40,
      book: "മത്തായി",
    },
    {
      num: 41,
      book: "മർക്കൊസ്",
    },
    {
      num: 42,
      book: "ലൂക്കോസ്",
    },
    {
      num: 43,
      book: "യോഹന്നാൻ",
    },
    {
      num: 44,
      book: "പ്രവൃത്തികൾ",
    },
    {
      num: 45,
      book: "റോമർ",
    },
    {
      num: 46,
      book: "കൊരിന്ത്യർ 1",
    },
    {
      num: 47,
      book: "കൊരിന്ത്യർ 2",
    },
    {
      num: 48,
      book: "ഗലാത്യർ",
    },
    {
      num: 49,
      book: "എഫെസ്യർ",
    },
    {
      num: 50,
      book: "ഫിലിപ്പിയർ",
    },
    {
      num: 51,
      book: "കൊലൊസ്സ്യർ",
    },
    {
      num: 52,
      book: "തെസ്സലൊനീക്യർ 1",
    },
    {
      num: 53,
      book: "തെസ്സലൊനീക്യർ 2",
    },
    {
      num: 54,
      book: "തിമൊഥെയൊസ് 1",
    },
    {
      num: 55,
      book: "തിമൊഥെയൊസ് 2",
    },
    {
      num: 56,
      book: "തീത്തൊസ്",
    },
    {
      num: 57,
      book: "ഫിലേമോൻ",
    },
    {
      num: 58,
      book: "എബ്രായർ",
    },
    {
      num: 59,
      book: "യാക്കോബ്",
    },
    {
      num: 60,
      book: "പത്രൊസ് 1",
    },
    {
      num: 61,
      book: "പത്രൊസ് 2",
    },
    {
      num: 62,
      book: "യോഹന്നാൻ 1",
    },
    {
      num: 63,
      book: "യോഹന്നാൻ 2",
    },
    {
      num: 64,
      book: "യോഹന്നാൻ 3",
    },
    {
      num: 65,
      book: "യൂദാ",
    },
    {
      num: 66,
      book: "വെളിപ്പാടു",
    },
  ]);

  // const [filterusers, setFilterUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  //  var bible;
  //  function readJsonFile() {
  //      var rawFile = new XMLHttpRequest();
  //      rawFile.overrideMimeType("application/json");
  //      rawFile.onreadystatechange = function() {
  //          if (rawFile.readyState === 4 && rawFile.status == "200") {
  //              bible = JSON.parse(rawFile.responseText);
  //          }
  //      };
  //      rawFile.open("GET", "t", true);
  //      rawFile.send();
  //  }

  //  function queryverse(book, chapter, verse)
  //  {
  //     return bible.Book[book - 1].Chapter[chapter - 1].Verse[verse - 1].Verse;
  //  }
  // useEffect(() => {}, []);

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
    <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
      <View style={[t.mT2, t.mY3]}>
        <Button
          title={old ? "New Testement" : "Old Testement"}
          onPress={() => setOld(!old)}
          style={[]}
        />
      </View>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.num}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={malbooks}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View>
              {(old && parseInt(item.num) < 40) ||
              (!old && parseInt(item.num) >= 40) ? (
                <View>
                  <TouchableOpacity
                    style={[]}
                    onPress={() => {
                      // console.log(item);
                      // handlePress(item);
                      navigation.navigate("MalChapters", item);
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
                      <Entypo
                        name="book"
                        size={32}
                        color="black"
                        style={[t.mT4, t.textCenter]}
                      />
                      <View style={[]}>
                        <Text
                          style={[
                            t.text2xl,
                            t.fontSemibold,
                            t.mX2,
                            t.mL3,
                            t.mR32,
                          ]}
                        >
                          {item.book}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
          // ItemSeparatorComponent={renderSeparator}
        />
      </View>
      </ImageBackground>
    </View>
  );
};

export default MalBooks;
