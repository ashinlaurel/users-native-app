import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";

const Books = ({ navigation }) => {
  const [old, setOld] = useState(true);
  const [books, setBooks] = useState([
    {
      num: 1,
      book: "Genesis",
    },
    {
      num: 2,
      book: "Exodus",
    },
    {
      num: 3,
      book: "Leviticus",
    },
    {
      num: 4,
      book: "Numbers",
    },
    {
      num: 5,
      book: "Deuteronomy",
    },
    {
      num: 6,
      book: "Joshua",
    },
    {
      num: 7,
      book: "Judges",
    },
    {
      num: 8,
      book: "Ruth",
    },
    {
      num: 9,
      book: "1 Samuel",
    },
    {
      num: 10,
      book: "2 Samuel",
    },
    {
      num: 11,
      book: "1 Kings",
    },
    {
      num: 12,
      book: "2 Kings",
    },
    {
      num: 13,
      book: "1 Chronicles",
    },
    {
      num: 14,
      book: "2 Chronicles",
    },
    {
      num: 15,
      book: "Ezra",
    },
    {
      num: 16,
      book: "Nehemiah",
    },
    {
      num: 17,
      book: "Esther",
    },
    {
      num: 18,
      book: "Job",
    },
    {
      num: 19,
      book: "Psalm",
    },
    {
      num: 20,
      book: "Proverbs",
    },
    {
      num: 21,
      book: "Ecclesiastes",
    },
    {
      num: 22,
      book: "Song of Solomon",
    },
    {
      num: 23,
      book: "Isaiah",
    },
    {
      num: 24,
      book: "Jeremiah",
    },
    {
      num: 25,
      book: "Lamentations",
    },
    {
      num: 26,
      book: "Ezekiel",
    },
    {
      num: 27,
      book: "Daniel",
    },
    {
      num: 28,
      book: "Hosea",
    },
    {
      num: 29,
      book: "Joel",
    },
    {
      num: 30,
      book: "Amos",
    },
    {
      num: 31,
      book: "Obadiah",
    },
    {
      num: 32,
      book: "Jonah",
    },
    {
      num: 33,
      book: "Micah",
    },
    {
      num: 34,
      book: "Nahum",
    },
    {
      num: 35,
      book: "Habakkuk",
    },
    {
      num: 36,
      book: "Zephaniah",
    },
    {
      num: 37,
      book: "Haggai",
    },
    {
      num: 38,
      book: "Zechariah",
    },
    {
      num: 39,
      book: "Malachi",
    },
    {
      num: 40,
      book: "Matthew",
    },
    {
      num: 41,
      book: "Mark",
    },
    {
      num: 42,
      book: "Luke",
    },
    {
      num: 43,
      book: "John",
    },
    {
      num: 44,
      book: "Acts",
    },
    {
      num: 45,
      book: "Romans",
    },
    {
      num: 46,
      book: "1 Corinthians",
    },
    {
      num: 47,
      book: "2 Corinthians",
    },
    {
      num: 48,
      book: "Galatians",
    },
    {
      num: 49,
      book: "Ephesians",
    },
    {
      num: 50,
      book: "Philippians",
    },
    {
      num: 51,
      book: "Colossians",
    },
    {
      num: 52,
      book: "1 Thessalonians",
    },
    {
      num: 53,
      book: "2 Thessalonians",
    },
    {
      num: 54,
      book: "1 Timothy",
    },
    {
      num: 55,
      book: "2 Timothy",
    },
    {
      num: 56,
      book: "Titus",
    },
    {
      num: 57,
      book: "Philemon",
    },
    {
      num: 58,
      book: "Hebrews",
    },
    {
      num: 59,
      book: "James",
    },
    {
      num: 60,
      book: "1 Peter",
    },
    {
      num: 61,
      book: "2 Peter",
    },
    {
      num: 62,
      book: "1 John",
    },
    {
      num: 63,
      book: "2 John",
    },
    {
      num: 64,
      book: "3 John",
    },
    {
      num: 65,
      book: "Jude",
    },
    {
      num: 66,
      book: "Revelation",
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
  useEffect(() => {}, []);

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
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
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
          data={books}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View>
              {(old && parseInt(item.num) < 40) || parseInt(item.num) >= 40 ? (
                <View>
                  <TouchableOpacity
                    style={[]}
                    onPress={() => {
                      // console.log(item);
                      // handlePress(item);
                      navigation.navigate("Chapters", item);
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
    </View>
  );
};

export default Books;
