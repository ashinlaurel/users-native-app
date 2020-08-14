import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import bible from "../../assets/biblejs";

const Chapters = ({ navigation, route }) => {
  const { num, book } = route.params;
  const [count, setCount] = useState(0);
  let counter = 0;

  useEffect(() => {
    let number = bible.Book[num - 1].Chapter.map((num) => {
      counter++;
    });
    console.log(counter);
    setCount(counter);
  }, []);
  const [chapters, setChapters] = useState([
    { name: "1", uid: "1" },
    { name: "2", uid: "2" },
    { name: "3", uid: "3" },
    { name: "4", uid: "4" },
    { name: "5", uid: "5" },
    { name: "6", uid: "6" },
  ]);
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
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <Text style={[t.text4xl, t.fontBold]}>{book}</Text>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={3}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={chapters}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[]}
              onPress={() => {
                // console.log(item);
                // handlePress(item);
                navigation.navigate("Verses", item);
              }}
            >
              <View style={[]}>
                <Text style={[t.text2xl, t.fontSemibold, t.mX2, t.mL3, t.mR32]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          //   ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default Chapters;
