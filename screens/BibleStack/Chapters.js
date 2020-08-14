import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ListView,
  StyleSheet,
} from "react-native";
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
    let temp = [];

    for (let i = 0; i < counter; i++) {
      temp.push({ name: i + 1, uid: i + 1 });
      // console.log(temp);
    }
    setChapters(temp);
    // console.log(temp);
    // console.log(counter);
    setCount(counter);
  }, []);
  const [chapters, setChapters] = useState([]);
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
    <View style={[t.flex, t.itemsCenter, t.mT2]}>
      <Text style={[t.text3xl]}>{book}</Text>
      <View style={[]}>
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
                navigation.navigate("Verses", {
                  booknum: num,
                  vnum: item.name,
                });
              }}
            >
              <View style={[t.m2]}>
                <Text style={styles.line}>{item.name}</Text>
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

const styles = StyleSheet.create({
  line: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 100,
    backgroundColor: "#e4eced",
    borderRadius: 10,
    padding: 3,
  },
});
