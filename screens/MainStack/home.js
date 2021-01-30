import React, { useState, useEffect, useContext, useMemo } from "react";
import { db } from "../../firebase/firebase";
// import { Card, theme, Block } from "galio-framework";
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
  ImageBackground,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import { DataContext } from "../../context/DataContext";
import { useFocusEffect } from "@react-navigation/native";
import bg from "../../assets/bg.jpg";
import { LoginContext } from "../../context/LoginContext";

const Home = ({ navigation }) => {
  const [users, setUsers] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const { role } = useContext(LoginContext); 
  const { filterusers, setFilterUsers } = useContext(DataContext);
  // const [filterusers, setFilterUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // const [loading, setLoading] = useState(false);
  const [lastvisible, setLastvisible] = useState(null)
  const [limit, setLimit] = useState(9);

  // useMemo(() => setFilterUsers(filterusers), [filterusers]);
  // First Time Getting Data

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // handleRefresh();
      handleInitial();
    });
    return unsubscribe;
  }, []);
  
  // Init getter
  const handleInitial = async () => {
    setLoading(true);
    console.log("HEERRREEEE")
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
    let usersRef;
    if(role==0)  usersRef = db.collection("dirusers").orderBy('name').limit(9);
    else  usersRef = db.collection("dirusers").where('FamilyHead',"==",true).orderBy('name').limit(9);
    // const usersRef = db.collection("dirusers").orderBy('name').limit(9);
    const snapshot = await usersRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      setUsers([]);
      setFilterUsers([]);
      setLoading(false);
      return;
    }
    let tempusers = snapshot.docs.map((i) => ({
      key: i.id,
      ...i.data(),
    }));
    // console.log(tempusers)
    console.log("lastKey",tempusers[tempusers.length - 1])
    setLastvisible(tempusers[tempusers.length - 1].name);
     setUsers(tempusers);
     setFilterUsers(tempusers);
    setLoading(false);
  };

  
  // Handling the Refresh

    const handleRefresh = async () => {
      setLoading(true);
      console.log("REFRESH")
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
      let usersRef;
      if(role==0)  usersRef = db.collection("dirusers").orderBy('name').startAfter(lastvisible).limit(9);
      else  usersRef = db.collection("dirusers").where('FamilyHead',"==",true).orderBy('name').startAfter(lastvisible).limit(9);

      const snapshot = await usersRef.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        // setUsers([]);
        // setFilterUsers([]);
        setLoading(false);
        return;
      }
      let tempusers = snapshot.docs.map((i) => ({
        key: i.id,
        ...i.data(),
      }));
      
      console.log("lastKey",tempusers[tempusers.length - 1].key)
      // console.log(tempusers)
      setLastvisible(tempusers[tempusers.length - 1].name);
       setUsers([...users,...tempusers]);
       setFilterUsers([...users,...tempusers]);
      //  setFilterUsers(tempusers);
      
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
    <View style={[t.flex, t.justifyCenter, t.itemsCenter]}>
      <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
        <View style={[t.wFull]}>
          {/* <TextInput
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
              // t.border,
              t.mX5,
              t.mY3,
            ]}
            keyboardType="default"
          /> */}
        </View>
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
            data={filterusers}
            refreshing={loading}
            onRefresh={handleInitial}
            onEndReached={handleRefresh}
            onEndReachedThreshold={2}
            // refreshing={()=>setLoading(true)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[]}
                onPress={() => {
                  // console.log(item);
                  // handlePress(item);
                  navigation.navigate("FamilyDetails", item);
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
                      uri: `${item.imgUrl!=""?`${item.imgUrl}`:`https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png`}`,
                    }}
                    defaultSource={{
                      uri: "https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
                    }}
                    
                    style={[
                      t.w16,
                      t.h16,
                      t.roundedFull,
                      t.overflowHidden,
                      t.mX4,
                    ]}
                  />
                  <View style={[]}>
                    <Text
                      style={[t.textXl, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[t.textBase, t.fontSemibold, t.mX2, t.mL3, t.mR32]}
                    >
                      {item.houseName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              // Galio Card--------------------------------------------
            )}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
