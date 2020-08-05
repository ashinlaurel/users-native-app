import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
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
import { MaterialIcons } from "@expo/vector-icons";
import UserForm from "./userForm";
import { TextInput } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const [filterusers, setFilterUsers] = useState(users);
  const [search, setSearch] = useState("");

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
    })();
  }, []);

  const addUser = async (user) => {
    // user.key = Math.random().toString();
    const res = await db.collection("directory").doc("LA").set(data);

    setUsers((users) => {
      return [user, ...users];
    });
    setModalOpen(false);
  };

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      {/* <Modal visible={modalOpen} animationType={"slide"} transparent={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={[]}>
            <View style={[t.mY5]}>
              <View style={[t.flexRow, t.itemsCenter, t.justifyCenter]}>
                <Text style={[t.text3xl, t.fontBold, t.pL3, t.pT1]}>
                  Add New Users
                </Text>
                <TouchableOpacity>
                  <MaterialIcons
                    style={[t.mL20, t.pT2]}
                    name="close"
                    size={30}
                    onPress={() => {
                      setModalOpen(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              <UserForm addUser={addUser} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}

      {/* <Text style={[t.text3xl, t.fontBold, t.mT2, t.textCenter]}>Users</Text> */}
      {/* <TouchableOpacity>
        <MaterialIcons
          name="add"
          size={30}
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </TouchableOpacity> */}
      <View style={[t.wFull]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          onTextChange={(e) => {
            setSearch(e.target.value);
            let temp = users.filter((user) => user.name.includes(search));
            if (search == "") {
              setFilterUsers(users);
            } else {
              setFilterUsers(temp);
            }
          }}
          value={search}
          style={[t.pY2, t.pX4, t.bgWhite, t.wFull, t.roundedFull, t.mY3]}
          keyboardType="default"
        />
      </View>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY5]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          style={[]}
          data={filterusers}
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
                  t.bgGray300,
                  t.mY1,
                  t.rounded,
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
                  <Text style={[t.text2xl, t.mX2, t.mL3, t.mR32]}>
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            // Galio Card--------------------------------------------
          )}
        />
      </View>
    </View>
  );
};

export default Home;
