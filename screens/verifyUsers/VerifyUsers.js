import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  View,
  Text,
  //   Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ListView,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
// import { Card } from "@paraboly/react-native-card";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

const VerifyUsers = ({ navigation }) => {
  const [users, setUsers] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [filterusers, setFilterUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // First Time Getting Data
  useEffect(() => {
    (async function getter() {
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
      setUsers(tempusers);
      setFilterUsers(tempusers);
      console.log(tempusers);
    })();
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
  const handleVerify = (id) => {
    let updateuser = [];
    // console.log("here", id);
    users.map((user) => {
      if (user.key == id) {
        user.verified = 1;

        db.collection("dirusers")
          .doc(id)
          .update({
            verified: 1,
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

        Alert.alert("Verified");
      }
      updateuser.push(user);
    });
    setUsers(updateuser);
    setFilterUsers(updateuser);
  };

  return (
    <View
      style={[
        t.flex,
        t.justifyCenter,
        // t.itemsCenter,
        t.mT8,
        t.flexCol,
      ]}
    >
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
      <View style={[t.pY2, t.pX5]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={filterusers}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[]}>
              <Card style={[t.wFull]}>
                <CardTitle title={item.name} />
                <CardContent
                  text={`Age:${item.age} . Address:${item.address} . Job:${item.job}`}
                />
                <CardAction separator={true} inColumn={false}>
                  <CardButton
                    onPress={() => {
                      item.verified == 1
                        ? Alert.alert("Already Verified")
                        : handleVerify(item.key);
                    }}
                    title={item.verified == 1 ? `Verified` : `Verify`}
                    color={item.verified == 1 ? `green` : `maroon`}
                  />
                </CardAction>
              </Card>
            </View>
          )}
          //   ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default VerifyUsers;
