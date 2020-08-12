import React, { useContext } from "react";
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
import { LoginContext } from "../../context/LoginContext";

const InitialScreen = ({ navigation }) => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // First Time Getting Data

  // Handling the Refresh

  return (
    <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.mT8]}>
      <Text style={[t.text5xl, t.textCenter, t.fontBold, t.mB20, t.mX8]}>
        BETHEL MAR THOMA CHURCH
      </Text>
      <View style={[]}>
        {/* Row-1----------------------------------------------------- */}
        <View style={[t.flexRow, t.justifyAround]}>
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
            <TouchableOpacity>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
          <View style={[t.bgGray300, t.mX1, t.w32, t.flexCol, t.itemsCenter]}>
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
  );
};

export default InitialScreen;
