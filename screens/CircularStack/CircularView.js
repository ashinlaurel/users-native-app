import * as React from "react";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";

const CircularView = ({ route }) => {
  const { uri } = route.params;

  return (
    <PDFReader
      source={{
        uri: uri,
      }}
    />
  );
};

export default CircularView;
