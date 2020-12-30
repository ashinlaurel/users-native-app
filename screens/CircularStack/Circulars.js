import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../../firebase/firebase";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  ListView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
import { DataContext } from "../../context/DataContext";
<<<<<<< HEAD
import bg from "../../assets/bg.png";
=======
import { LoginContext } from "../../context/LoginContext";
>>>>>>> 56ca58f8194327db658d01bcc3f5264d92a37f6e

const Circulars = ({ navigation }) => {
  const { role } = useContext(LoginContext);

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
      setLoading(false);
      setCirculars([]);
      setFilterCirculars([]);
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

  const handleDelete = (key) => {
    // return;
    console.log(key);
    db.collection("circulars")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    let storageRef = storage.ref();

    var circularRef = storageRef.child("circulars/" + key);

    // Delete the file
    circularRef
      .delete()
      .then(function () {
        // File deleted successfully
        console.log("Deleted the pdf ");
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });

    handleRefresh();
  };

  const createTwoButtonAlert = (key) =>
    Alert.alert(
      "Delete Circular",
      "Are You sure you want to delete the circular ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete(key) },
      ],
      { cancelable: false }
    );

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
            let temp = circulars.filter((circular) =>
              circular.title.toLowerCase().includes(search.toLowerCase())
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
      {/* <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
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
      </View> */}
      <View
        style={[
          // t.flex,
          // t.itemsCenter,
          // t.justifyCenter,
          t.mY1,
          t.wFull,
          // t.border2,
        ]}
      >
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={filterCirculars}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[t.mB2, t.mX6, t.roundedBLg]}
              onPress={() => {
                navigation.navigate("Circular View", item);
                // createTwoButtonAlert();
              }}
              onLongPress={() => {
                role == 0
                  ? createTwoButtonAlert(item.key)
                  : console.log("Not Admin");
              }}
            >
              <View
                style={[
                  t.pY8,
                  t.wFull,
                  t.textCenter,
                  t.flexRow,
                  t.itemsCenter,
                  t.justifyStart,
                  t.bgWhite,
                  t.roundedBLg,
                ]}
              >
                {/* <Image
                  source={{
                    uri: item.imgUrl,
                  }}
                  style={[t.w16, t.h16, t.roundedFull, t.overflowHidden, t.mX4]}
                /> */}
                <Ionicons
                  name="md-document"
                  size={32}
                  color="black"
                  style={[t.mX2]}
                />
                <View style={[]}>
                  <Text style={[t.textXl, t.mX2, t.mL3, t.mR32]}>
                    {item.title}
                  </Text>
                  {/* <Text
                    style={[t.textBase, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                  >
                    {item.houseName}
                  </Text> */}
                </View>
              </View>
            </TouchableOpacity>

            // Galio Card--------------------------------------------
          )}
          // ItemSeparatorComponent={renderSeparator}
        />
      </View>
      </ImageBackground>
    </View>
  );
};

export default Circulars;
