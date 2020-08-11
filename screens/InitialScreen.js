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
import { TextInput } from "react-native-gesture-handler";

const InitialScreen = ({ navigation }) => {
  // First Time Getting Data

  // Handling the Refresh

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      {/* Row-1----------------------------------------------------- */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>Events</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Circulars
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Row 2 ----------------------------------------------------------------------------------------------- */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Litergy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>Bible</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity onPress={() => navigation.navigate("Members")}>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Members
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Row 3 ------------------------------------------------------------------------------------------------ */}
      <View style={[t.flexRow, t.justifyAround, t.mY1]}>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Organisations
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgGray300, t.mX1, t.w32]}>
          <TouchableOpacity>
            <Text style={[t.textBase, t.mY6, t.mX2, t.textCenter]}>
              Locations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InitialScreen;
