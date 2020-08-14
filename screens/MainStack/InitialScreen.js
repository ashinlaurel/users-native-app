import React, { useContext } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { LoginContext } from "../../context/LoginContext";
import { ScrollView } from "react-native-gesture-handler";
//bg
import bg from "../../assets/bg.jpg";
import logo from "../../assets/logo.png";

let ScreenHeight = Dimensions.get("window").height;

const InitialScreen = ({ navigation }) => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // First Time Getting Data

  // Handling the Refresh

  return (
    <View>
      <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
        <View
          style={[t.flexCol, t.justifyCenter, t.itemsCenter, t.mT2, t.hFull]}
        >
          <Image source={logo} style={styles.image} />
          {/* <Text style={[t.text5xl, t.textCenter, t.fontBold, t.mB20, t.mX8]}>
            BETHEL MAR THOMA CHURCH
          </Text> */}
          <View style={[t.flexCol, t.justifyEnd]}>
            {/* Row-1----------------------------------------------------- */}
            <View style={[t.flexRow, t.justifyAround]}>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Message")}
                >
                  <Entypo
                    name="new-message"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                  <MaterialIcons
                    name="event"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Events
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity>
                  <Entypo
                    name="documents"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Circulars
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Row 2 ----------------------------------------------------------------------------------------------- */}
            <View style={[t.flexRow, t.justifyAround, t.mT1]}>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity>
                  <Entypo
                    name="new-message"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Litergy
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity>
                  <Entypo
                    name="book"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Bible
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity
                  onPress={() => {
                    isLoggedIn
                      ? navigation.navigate("Members")
                      : navigation.navigate("Login");
                  }}
                >
                  <Entypo
                    name="users"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Members
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Row 3 ------------------------------------------------------------------------------------------------ */}
            <View style={[t.flexRow, t.justifyAround, t.mY1]}>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Organisations")}
                >
                  <Entypo
                    name="home"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Organisations
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity>
                  <Entypo
                    name="phone"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Contact Us
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}
              >
                <TouchableOpacity>
                  <Entypo
                    name="location-pin"
                    size={32}
                    color="black"
                    style={[t.mT4, t.textCenter]}
                  />

                  <Text style={[t.textBase, t.mY3, t.mX2, t.textCenter]}>
                    Locations
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  height: Dimensions.get("window").height - 50,
});

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 180,
    marginBottom: 40,
    resizeMode: "stretch",
  },
});
