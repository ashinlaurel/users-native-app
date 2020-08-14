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

const Chapters = ({ navigation }) => {
  const [chapters, setChapters] = useState([
    { name: "1", uid: "1" },
    { name: "2", uid: "2" },
    { name: "3", uid: "3" },
    { name: "4", uid: "4" },
    { name: "5", uid: "5" },
    { name: "6", uid: "6" },
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