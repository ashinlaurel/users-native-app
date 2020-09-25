import * as React from "react";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";

const CircularView = ({ route }) => {
  const { docUrl } = route.params;

  return (
    <PDFReader
      source={{
        uri: docUrl,
      }}
    />
  );
};

export default CircularView;
