import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Platform, Linking, Alert } from "react-native";
import { db } from "../../firebase/firebase";
import { t } from "react-native-tailwindcss";
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import moment from "moment";
import { LoginContext } from "../../context/LoginContext";

const LectDetails = ({ route, navigation }) => {
  //
  // Extracting from the route params-------------------------------------------------
  const { item,lectionaryitems } = route.params;
  const [lessons, setLessons] = useState([]);

  const { role } = useContext(LoginContext);

  // console.log(name);
  // ---------------------------------------------------------------------------------
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

  useEffect(() => {
    let temp=[]
    lectionaryitems.map(i=>{
      if(`${i.month} ${i.year}`==item){
        console.log("found");
        temp=temp.concat({title:`${i.heading} - ${moment(i.date).format('MMM Do')}`,lesson:""})
        temp=temp.concat(i.lessons);
      }
    })
    console.log(temp)
    setLessons(temp)
  }, [])

  const handleDelete = () => {
    console.log(key);
    db.collection("messages")
      .doc(key)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    navigation.navigate("Messages");
  };
  return (
    <ScrollView>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,
          // t.mY0,
          t.mX2,
          t.mT20,
          t.bgBlue300,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB10, t.flexCol, t.itemsCenter]}>
          <View>
            <Image
              source={{
                uri:
                  "https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
              }}
              style={[
                t.border4,
                t.borderWhite,
                t.w32,
                t.h32,
                t.roundedFull,
                t.overflowHidden,
                t.mX4,
                t._mT20,
              ]}
            />
          </View>
          <Text
            style={[t.text2xl, t.textCenter, t.pT1, t.textGray800, t.fontBold]}
          >{item}
            {/* {moment(date).format("MMMM YYYY")} */}
          </Text>
          
        </View>
      </View>
      {/* Details---------------------------- */}
      <View
        style={[
          t.flex,
          t.itemsStart,
          t.justifyStart,
          t.mX2,
          t.bgGray200,
          t.mY2,
        ]}
      >
        {/* <View style={[]}>
          <View style={[]}>
            <View style={[t.flex, t.flexCol, t.mX4]}>
              <Text style={[t.textXl, t.fontBold]}>{item}</Text>
            </View>
          </View>
        </View> */}
        <View style={[t.flex, t.itemsCenter, t.justifyCenter, t.mY1]}>
          <FlatList
            numColumns={1}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={lessons}
            // refreshing={loading}
            // onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[]}
                onPress={() => {
                  console.log(item);
                  // handlePress(item);
                  //   navigation.navigate("UserDetails", item);
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
                  <View
                    style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}
                  >
                  {item.lesson==""?(
                    <Text
                      style={[t.textBase, t.fontSemibold, t.mX2, t.mL3,t.fontBold]}
                    >
                      {item.title}
                    </Text>
                  ):(
                    <Text
                      style={[t.textBase, t.fontSemibold, t.mX2, t.mL3,]}
                    >
                      {item.title}
                    </Text>
                  )}
                    
                    
                    <Text
                      style={[t.textBase,t.flex1, t.fontSemibold, t.mX1, t.mL3]}
                    >
                      {item.lesson}
                    </Text>
                    
                  </View>
                </View>
              </TouchableOpacity>

              // Galio Card--------------------------------------------
            )}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LectDetails;
