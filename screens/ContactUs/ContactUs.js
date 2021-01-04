import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "@paraboly/react-native-card";
import moment from "moment";
import { db } from "../../firebase/firebase"

const ContactDetails = ({ route }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  
  useEffect(() => {
    var docRef = db.collection("contactinfo").doc("nE27zOdX2f17ug2kg7kh");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        setName(doc.data().name);
        setPhone(doc.data().phone);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    
  }, [])
  return (
    <View
      style={[
        t.flex,
        // t.itemsCenter,
        // t.justifyCenter,
        t.mY0,
        t.pX10,
        t.mT1,
        t.mB20,
        t.bgWhite,
        // t.roundedFull,
        // t.shadowXl,
        // t.rounded,
        t.pY5,
      ]}
    >
      <View style={[]}>
      <View
        style={[
          t.flex,
          t.itemsCenter,
          t.justifyCenter,
          t.mY5,
          t.mX2,
          t.mT10,
          // t.bgBlue300,
          t.rounded,
        ]}
      >
        <View style={[t.textCenter, t.pB2, t.flexCol, t.itemsCenter]}>
          
          <Text
            style={[t.text2xl, t.textCenter, t.pY1, t.textGray900, t.fontBold]}
          >
            Contact Us!
          </Text>
          
          
        </View>
      </View>
      

        <View style={[]}>
          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="user" size={24} color="grey" style={[t.mX2]} />

            <Text >{name}</Text>
          </View>

          <View style={[t.flex, t.flexRow, t.pY2, t.mY1]}>
            <Entypo name="phone" size={24} color="grey" style={[t.mX2]} />

            <Text >
              {phone}
            </Text>
          </View>

          
        </View>
      </View>
    </View>
  );
};

export default ContactDetails;
