import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";
import UserForm from "./userForm";

const Home = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { name: "Ashin Laurel", age: 21, address: "Trivandrum", key: "1" },
    { name: "Alan Tom", age: 21, address: "Kottayam", key: "2" },
    { name: "Siddarth Sajeev", age: 19, address: "Triponithara", key: "3" },
    { name: "Arvind Ranjith", age: 21, address: "Trivandrum", key: "4" },
  ]);

  const addUser = (user) => {
    user.key = Math.random().toString();
    setUsers((users) => {
      return [user, ...users];
    });
    setModalOpen(false);
  };

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <Modal visible={modalOpen} animationType={"slide"} transparent={false}>
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
      </Modal>

      {/* <Text style={[t.text3xl, t.fontBold, t.mT2, t.textCenter]}>Users</Text> */}
      <TouchableOpacity>
        <MaterialIcons
          name="add"
          size={30}
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </TouchableOpacity>
      <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY5]}>
        <FlatList
          numColumns={2}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // console.log(item);
                // handlePress(item);
                navigation.navigate("UserDetails", item);
              }}
            >
              <View
                style={[
                  t.p5,
                  t.bgGray300,
                  t.m2,
                  t.rounded,
                  t.w40,
                  t.textCenter,
                ]}
              >
                <Text style={[t.textxl]}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Home;
