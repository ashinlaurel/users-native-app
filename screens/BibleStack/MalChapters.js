import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import malbible from "../../assets/biblejs";
// import malbible from "../../assets/malbiblejs";
import bg from "../../assets/bg.png";

const MalChapters = ({ navigation, route }) => {
  const { num, book } = route.params;
  const [count, setCount] = useState(0);
  let counter = 0;

  useEffect(() => {
    let number = malbible.Book[num - 1].Chapter.map((num) => {
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
    <View style={[t.flex, t.itemsCenter]}>
    <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
      <Text style={[t.text3xl, t.fontBold, t.mY5]}>{book}</Text>
      <View style={[t.pB32]}>
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
                navigation.navigate("MalVerses", {
                  booknum: num,
                  vnum: item.name,
                  book: book,
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
      </ImageBackground>
    </View>
  );
};

export default MalChapters;

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
