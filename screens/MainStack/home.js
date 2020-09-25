import React, { useState, useEffect, useContext, useMemo } from "react";
import { db } from "../../firebase/firebase";
import { Card, theme, Block } from "galio-framework";
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
import { DataContext } from "../../context/DataContext";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [users, setUsers] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const { filterusers, setFilterUsers } = useContext(DataContext);
  // const [filterusers, setFilterUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // useMemo(() => setFilterUsers(filterusers), [filterusers]);
  // First Time Getting Data

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleRefresh();
    });
    return unsubscribe;
  }, []);
  // Handling the Refresh
  const handleRefresh = async () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    const usersRef = db.collection("dirusers");
    const snapshot = await usersRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    await setUsers(tempusers);
    await setFilterUsers(tempusers);
    setLoading(false);
  };

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
      <View style={[t.wFull]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setSearch(text);
            let temp = users.filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilterUsers(temp);
          }}
          value={search}
          style={[
            t.pY1,
            t.pX5,
            t.bgWhite,
            t.roundedFull,
            t.border,
            t.mX5,
            t.mY3,
          ]}
          keyboardType="default"
        />
      </View>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={filterusers}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[]}
              onPress={() => {
                // console.log(item);
                // handlePress(item);
                navigation.navigate("UserDetails", item);
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
                <Image
                  source={{
                    uri: item.imgUrl,
                  }}
                  style={[t.w16, t.h16, t.roundedFull, t.overflowHidden, t.mX4]}
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

            // Galio Card--------------------------------------------
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default Home;
