import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground,
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
import bg from "../../assets/bg.png";

const MessageList = ({ navigation }) => {
  const [messages, setMessages] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const { filterMessages, setFilterMessages } = useContext(DataContext);

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

    const messagesRef = db.collection("messages");
    const snapshot = await messagesRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    await setMessages(tempusers);
    await setFilterMessages(tempusers);
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
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setSearch(text);
            let temp = messages.filter((message) =>
              message.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilterMessages(temp);
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
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={[]}
          data={filterMessages}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[t.pY3]}>
              <Card
                title={item.mainheading}
                iconName="home"
                backgroundColor="red"
                defaultTitle=""
                iconType="Entypo"
                defaultContent=""
                titleColor="black"
                content={`On ${moment(item.date).format(
                  "dddd, MMMM Do YYYY "
                )} `}
                // topRightText={item.id}
                onPress={() => {
                  navigation.navigate("Message", item);
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

export default MessageList;
