import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  Image,
  Alert,
} from "react-native";
import { t } from "react-native-tailwindcss";
import { Formik } from "formik";
import { auth, db } from "../../firebase/firebase";
import gif from "../../assets/checkmark.gif";

const LoginCode = (props) => {
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(false);
  const [loginCode, setloginCode] = useState("--Not Set--");
  const { navigate } = props.navigation;


  const SetLoginCode = (values) => {
    if (values.code ==="") {
      Alert.alert("Please enter code!");
      return;
    }
    db.collection("logincode").doc("1")
    .update({
      code: values.code
  })
  .then(function() {
      console.log("Document successfully updated!");
      setloginCode(values.code)
      Alert.alert("Login code set")
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      Alert.alert("Some error occured")
  });    
    
  };


  const DeleteLoginCode = () => {
  
    db.collection("logincode").doc("1")
    .update({
      code: ""
  })
  .then(function() {
      console.log("Document successfully updated!");
      setloginCode("--Not Set--")
      Alert.alert("Login code deleted")
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      Alert.alert("Some error occured")
  });    
    
  };
  useEffect(() => {
    db.collection("logincode").doc("1").get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        setloginCode(doc.data().code);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  },[]);
  return (
    <View>
      <Modal visible={modalState}>
        <View>
          <Image source={gif} size={40} />
        </View>
      </Modal>

      <Text
        style={[
          t.text3xl,
          t.pY3,
          t.textCenter,
          t.mT10,
          t.fontBold,
          t.textGray800,
        ]}
      >
        Current Login Code
      </Text>

      <Text
        style={[
          t.text3xl,
          t.pY3,
          t.textCenter,
          t.mT30,
          t.fontBold,
          t.textGray800,
        ]}
      >
        {loginCode}
      </Text>

      <Text
        style={[
          t.text3xl,
          t.pY3,
          t.textCenter,
          t.mT3,
          t.fontBold,
          t.textGray800,
        ]}
      >
        Set new Login Code
      </Text>
      <View style={[t.mX5]}>
        <Formik
          initialValues={{
            code: "",
          
          }}
          onSubmit={(values, actions) => {
            // actions.resetForm();
            SetLoginCode(values);
            //   console.log(values);
          }}
        >
          {(props) => (
            <View style={[t.mY2, t.wFull, t.pX3]}>
              <TextInput
                placeholder="Code"
                placeholderTextColor="black"
                onChangeText={props.handleChange("code")}
                value={props.values.code}
                style={[t.pY2, t.pX4,t.bgWhite, t.roundedFull, t.mY3]}
              />
              
             
              <View style={[t.mY2]}>
                <Button
                  title="Set New Login Code"
                  color="gray"
                  onPress={props.handleSubmit}
                />
              </View>
              <View style={[t.mY2]}>
                <Button
                  title="Delete Login Code"
                  color="gray"
                  onPress={()=>{
                    DeleteLoginCode();
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
        <Text style={[t.textCenter, t.fontBold]}>{error}</Text>
      </View>
    </View>
  );
};

export default LoginCode;
