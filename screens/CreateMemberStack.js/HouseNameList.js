import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/firebase";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { t } from "react-native-tailwindcss";
import { TextInput } from "react-native-gesture-handler";
import moment from "moment";
import { DataContext } from "../../context/DataContext";
import { Formik } from "formik";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import { cos } from "react-native-reanimated";

const HouseNameList = ({ route, navigation }) => {
  const [events, setEvents] = useState([
    // { name: "Ashin Laurel", age: 21, address: "Trivandrum", uid: "1" },
  ]);
  const { filterEvents, setFilterEvents } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { setHouseName, setHouseId } = route.params;
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

    const eventsRef = db.collection("housenames");
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

  const AddHouseName = async (values) => {
    // Alert.alert(params.hope)
    if (values.HouseName == "") {
      Alert.alert("Error", "Name is necessary ");
      return;
    }
    setHouseName(values.HouseName);
    values.members = [];
    db.collection("housenames")
      .add(values)
      .then((ref) => {
        console.log("Added document with ID: ", ref.id);
        // newId = ref.id;
        setHouseId(ref.id);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err.code);
        // return;
      });
  };

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT20]}>
      {/* //////PART 1 */}
      {/* <Text style={[t.mT20, t.bgBlue700]}>Create New House Name</Text> */}
      <Formik
        initialValues={{
          HouseName: "",
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          AddHouseName(values);
        }}
      >
        {(props) => (
          <View style={[t.mT16, t.wFull, t.pX3]}>
            <TextInput
              placeholder="New House Name"
              placeholderTextColor="black"
              onChangeText={props.handleChange("HouseName")}
              value={props.values.name}
              style={[t.pY2, t.pX4, t.bgWhite, t.roundedFull, t.mY3]}
            />

            <View style={[t.mY2]}>
              <Button
                title="Create New House Name"
                color="grey"
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
      <Text style={[t.mT1, t.uppercase, t.fontBold]}>Or </Text>
      <Text style={[t.mT1, t.uppercase, t.fontSemibold]}>
        select existing house name.
      </Text>
      {/* //// PART 2 */}
      <View style={[t.wFull]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setSearch(text);
            // console.log(events);
          
            let temp = events.filter((event) =>
              event.HouseName.toLowerCase().includes(search.toLowerCase())
            );
            setFilterEvents(temp);
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
      
      <View style={[t.wFull,t.mB64]}>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
          style={[]}
          data={filterEvents}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <View style={[t.pY3]}>
              <Card style={[t.wFull]}>
                <CardTitle title={item.HouseName} />
                <CardContent><Text style={[t.fontSemibold]}>Members: {item.members.map((mem) =>
                  <>  {mem.name},</>
                )} </Text></CardContent>
                <CardAction separator={true} inColumn={false}>
                  <CardButton
                    onPress={() => {
                      setHouseId(item.key);
                      setHouseName(item.HouseName);
                      navigation.goBack();
                    }}
                    title="Select"
                  />
                </CardAction>
              </Card>
            </View>
          )}
        // ItemSeparatorComponent={renderSeparator}
        />
      </View>
      
    </View>
  );
};

export default HouseNameList;
