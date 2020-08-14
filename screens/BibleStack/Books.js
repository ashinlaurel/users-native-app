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
} from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";

const Books = ({ navigation }) => {
  const [books, setBooks] = useState([
    { name: "Sample Book", uid: "1" },
    { name: "Sample Book", uid: "2" },
    { name: "Sample Book", uid: "3" },
  ]);
  // const [filterusers, setFilterUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  // First Time Getting Data
  //   useEffect(() => {
  //     (async function getter() {
  //       const usersRef = db.collection("dirusers");
  //       const snapshot = await usersRef.get();
  //       if (snapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //       }
  //       let tempusers = snapshot.docs.map((i) => ({
  //         key: i.id,
  //         ...i.data(),
  //       }));
  //       setUsers(tempusers);
  //       setFilterUsers(tempusers);
  //     })();
  //   }, []);
  //   // Handling the Refresh
  //   const handleRefresh = async () => {
  //     setLoading(true);
  //     // setTimeout(() => {
  //     //   setLoading(false);
  //     // }, 1000);

  //     const usersRef = db.collection("dirusers");
  //     const snapshot = await usersRef.get();
  //     if (snapshot.empty) {
  //       console.log("No matching documents.");
  //       return;
  //     }
  //     let tempusers = snapshot.docs.map((i) => ({
  //       key: i.id,
  //       ...i.data(),
  //     }));
  //     await setUsers(tempusers);
  //     await setFilterUsers(tempusers);
  //     setLoading(false);
  //   };

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
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={books}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          renderItem={({ item }) => (
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
                {/* <Image
                  source={{
                    uri: item.imgUrl,
                  }}
                  style={[t.w16, t.h16, t.roundedFull, t.overflowHidden, t.mX4]}
                /> */}
                <Entypo
                  name="book"
                  size={32}
                  color="black"
                  style={[t.mT4, t.textCenter]}
                />
                <View style={[]}>
                  <Text
                    style={[t.text2xl, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default Books;
