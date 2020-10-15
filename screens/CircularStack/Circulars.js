import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase";
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
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
import { DataContext } from "../../context/DataContext";

const Circulars = ({ navigation }) => {
  const [circulars, setCirculars] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const { filterCirculars, setFilterCirculars } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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

    const eventsRef = db.collection("circulars");
    const snapshot = await eventsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let temp = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    await setCirculars(temp);
    await setFilterCirculars(temp);
    setLoading(false);
  };

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <View style={[t.wFull]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setSearch(text);
            let temp = circulars.filter((circular) =>
              event.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilterCirculars(temp);
          }}
          value={search}
          style={[
            t.pY1,
            t.pX5,
            t.bgWhite,
            t.roundedFull,
            // t.border,
            t.mX5,
            t.mY3,
          ]}
          keyboardType="default"
        />
        {/* <TouchableOpacity onPress={() => navigation.navigate("Create Event")}>
          <Text style={[t.bgBlue400, t.mt5]}>Create Event</Text>
        </TouchableOpacity> */}
      </View>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={[]}
          data={filterCirculars}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[t.pY3]}>
              <Card
                title={item.title}
                iconName="home"
                backgroundColor="red"
                defaultTitle=""
                iconType="Entypo"
                defaultContent=""
                titleColor="black"
                // content={item.title}
                // topRightText={item.location}
                onPress={() => {
                  navigation.navigate("Circular View", item);
                }}
                // topRightText={item.location}
                // bottomRightText={`On ${item.date} at ${item.time}`}
                // content={`On ${item.date} at ${item.time}`}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Circulars;
