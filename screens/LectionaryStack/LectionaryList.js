import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
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
  ImageBackground
} from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "@paraboly/react-native-card";
import { DataContext } from "../../context/DataContext";
import bg from "../../assets/bg.jpg";

const LectionaryList = ({ navigation }) => {
  const [lectionaryitems, setLectionaryItems] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [lectTitles, setlectTitles] = useState([]);
  const { filterLectItems, setFilterLectItems } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  let months = new Set();

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

    const eventsRef = db.collection("lectionary");
    const snapshot = await eventsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    let temp2=[];
    tempusers.map(i=>{
      temp2.push(`${i.month} ${i.year}`)
    })

    temp2.map(i=>{
      if(!months.has(i)) months.add(i);
    })
    // console.log("Here")
    // console.log(months);
    await setlectTitles([...months]);
    await setLectionaryItems(tempusers);
    await setFilterLectItems(tempusers);
    setLoading(false);
  };

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter]}>
    <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
      <View style={[t.wFull]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setSearch(text);
            let temp = lectionaryitems.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            );

            setFilterLectItems(temp);
            let temp2=[];
          temp.map(i=>{
            temp2.push(`${i.month} ${i.year}`)
          })
         months.clear();
          temp2.map(i=>{
            if(!months.has(i)) months.add(i);
          })
           setlectTitles([...months]);
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
      </View>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={lectTitles}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[t.pY3]}>
              <Card
                title={item}
                iconName="home"
                backgroundColor="red"
                // defaultTitle=""
                iconType="Entypo"
                // defaultContent=""
                titleColor="black"
                onPress={() => {
                  navigation.navigate("Lectionary Details", {item,lectionaryitems});
                }}
                // topRightText={item.location}
                // bottomRightText={`On ${item.date} at ${item.time}`}
                // content={`On ${item.date} at ${item.time}`}
              />
            </View>
          )}
        />
      </View>
      </ImageBackground>
    </View>
  );
};

export default LectionaryList;
