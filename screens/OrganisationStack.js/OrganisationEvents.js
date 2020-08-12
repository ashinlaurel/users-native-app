import React, { useState, useEffect } from "react";
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

const OrganisationEvents = ({ route, navigation }) => {
  const { name } = route.params;
  // console.log(name);

  const [events, setEvents] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [filterEvents, setFilterEvents] = useState(events);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // First Time Getting Data
  useEffect(() => {
    (async function getter() {
      const eventsRef = db.collection("events");
      const snapshot = await eventsRef.where("organisation", "==", name).get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      let tempusers = snapshot.docs.map((i) => ({
        key: i.id,
        ...i.data(),
      }));
      setEvents(tempusers);
      setFilterEvents(tempusers);
    })();
  }, []);
  // Handling the Refresh
  const handleRefresh = async () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    const eventsRef = db.collection("events");
    const snapshot = await eventsRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    await setEvents(tempusers);
    await setFilterEvents(tempusers);
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
            let temp = events.filter((event) =>
              event.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilterEvents(temp);
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
          data={filterEvents}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[t.pY3]}>
              <Card
                title={item.name}
                iconName="home"
                backgroundColor="red"
                defaultTitle=""
                iconType="Entypo"
                defaultContent=""
                onPress={() => {
                  navigation.navigate("EventDetails", item);
                  // console.log(item);
                }}
                topRightText={item.location}
                // bottomRightText={`On ${item.date} at ${item.time}`}
                content={`On ${item.date} at ${item.time}`}
              />
            </View>
            // <TouchableOpacity
            //   style={[]}
            //   onPress={() => {
            //     // console.log(item);
            //     // handlePress(item);
            //     // navigation.navigate("UserDetails", item);
            //   }}
            // >
            //   <View
            //     style={[
            //       t.pY3,
            //       t.wFull,
            //       t.textCenter,
            //       t.flexRow,
            //       t.itemsCenter,
            //       t.justifyStart,
            //     ]}
            //   >
            //     <View style={[]}>
            //       <Text style={[t.textmd, t.fontSemibold, t.mX2, t.mL3, t.mR2]}>
            //         {item.name}
            //       </Text>
            //     </View>

            //     <View style={[]}>
            //       <Text style={[t.textmd, t.fontSemibold, t.mX2, t.mL3, t.mR2]}>
            //         {item.location}
            //       </Text>
            //     </View>

            //     <View style={[]}>
            //       <Text style={[t.textmd, t.fontSemibold, t.mX2, t.mL3, t.mR2]}>
            //         {item.date}
            //       </Text>
            //     </View>
            //     <View style={[]}>
            //       <Text style={[t.textmd, t.fontSemibold, t.mX2, t.mL3, t.mR2]}>
            //         {item.time}
            //       </Text>
            //     </View>

            //   </View>
            // </TouchableOpacity>

            // Galio Card--------------------------------------------
          )}
          // ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default OrganisationEvents;
