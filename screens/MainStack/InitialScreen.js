import React, { useState, useEffect } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

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

const InitialScreen = ({ navigation }) => {
  // First Time Getting Data

  // Handling the Refresh

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <Text style={[t.text5xl, t.textCenter, t.fontBold, t.mB20, t.mX8]}>
        BETHEL MAR THOMA CHURCH
      </Text>
      {/* Row-1----------------------------------------------------- */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="new-message" size={32} color="black" style={[t.mT2]} />
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <MaterialIcons name="event" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity onPress={() => navigation.navigate("Events")}>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>Events</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="paper-plane" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Circulars
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Row 2 ----------------------------------------------------------------------------------------------- */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="new-message" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Litergy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="book" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>Bible</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="users" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity onPress={() => navigation.navigate("Members")}>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Members
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Row 3 ------------------------------------------------------------------------------------------------ */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="hand" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity
            onPress={() => navigation.navigate("Organisations")}
          >
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Organisations
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="phone" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
          <Entypo name="location-pin" size={32} color="black" style={[t.mT2]} />

          <TouchableOpacity>
            <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
              Locations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InitialScreen;
