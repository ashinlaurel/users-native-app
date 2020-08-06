import React from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation, title }) => {
  return (
    <View style={[t.wFull, t.hFull, t.flexRow, t.justifyStart, t.itemsCenter]}>
      <MaterialIcons
        style={[t.absolute, t.left0]}
        name="menu"
        size={28}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <View>
        <Text style={[t.text2xl, t.fontSemibold, t.mL12]}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
