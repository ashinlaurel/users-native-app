import React from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={[t.wFull, t.hFull, t.flexRow, t.justifyCenter, t.itemsCenter]}>
      <MaterialIcons
        style={[t.absolute, t.left0]}
        name="menu"
        size={28}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <View>
        <Text style={[t.text3xl, t.fontBold]}>BMT Church</Text>
      </View>
    </View>
  );
};

export default Header;
