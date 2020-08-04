import React from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";

const About = () => {
  return (
    <View style={[t.m5, t.p2, t.rounded, t.bgGray300]}>
      <Text style={[t.textBase]}>
        Need a customised modern and innovative website for your business? Need
        features like database integration and authentication to be embedded in
        your website? Look no further. Here at TurnBox we strive to deliver the
        best web solutions for businesses by building innovative, intuitve and
        secure websites and web apps. Take a look at our featured projects
        below.
      </Text>
    </View>
  );
};

export default About;
