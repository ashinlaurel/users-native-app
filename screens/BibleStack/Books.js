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
      book: "Jeremiah",
    },
    {
      num: 24,
      book: "Lamentations",
    },
    {
      num: 25,
      book: "Ezekiel",
    },
    {
      num: 26,
      book: "Daniel",
    },
    {
      num: 27,
      book: "Hosea",
    },
    {
      num: 28,
      book: "Joel",
    },
    {
      num: 29,
      book: "Amos",
    },
    {
      num: 30,
      book: "Obadiah",
    },
    {
      num: 31,
      book: "Jonah",
    },
    {
      num: 32,
      book: "Micah",
    },
    {
      num: 33,
      book: "Nahum",
    },
    {
      num: 34,
      book: "Habakkuk",
    },
    {
      num: 35,
      book: "Zephaniah",
    },
    {
      num: 36,
      book: "Haggai",
    },
    {
      num: 37,
      book: "Zechariah",
    },
    {
      num: 38,
      book: "Malachi",
    },
    {
      num: 39,
      book: "Matthew",
    },
    {
      num: 40,
      book: "Mark",
    },
    {
      num: 41,
      book: "Luke",
    },
    {
      num: 42,
      book: "John",
    },
    {
      num: 43,
      book: "Acts",
    },
    {
      num: 44,
      book: "Romans",
    },
    {
      num: 45,
      book: "1 Corinthians",
    },
    {
      num: 46,
      book: "2 Corinthians",
    },
    {
      num: 47,
      book: "Galatians",
    },
    {
      num: 48,
      book: "Ephesians",
    },
    {
      num: 49,
      book: "Philippians",
    },
    {
      num: 50,
      book: "Colossians",
    },
    {
      num: 51,
      book: "1 Thessalonians",
    },
    {
      num: 52,
      book: "2 Thessalonians",
    },
    {
      num: 53,
      book: "1 Timothy",
    },
    {
      num: 54,
      book: "2 Timothy",
    },
    {
      num: 55,
      book: "Titus",
    },
    {
      num: 56,
      book: "Philemon",
    },
    {
      num: 57,
      book: "Hebrews",
    },
    {
      num: 58,
      book: "James",
    },
    {
      num: 59,
      book: "1 Peter",
    },
    {
      num: 60,
      book: "2 Peter",
    },
    {
      num: 61,
      book: "1 John",
    },
    {
      num: 62,
      book: "2 John",
    },
    {
      num: 63,
      book: "3 John",
    },
    {
      num: 64,
      book: "Jude",
    },
    {
      num: 65,
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
      <Button
        title={old ? "New Testement" : "Old Testement"}
        onPress={() => setOld(!old)}
        style={[t.mY5]}
      />
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
              {(old && parseInt(item.num) < 39) || parseInt(item.num) >= 39 ? (
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
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default Books;
