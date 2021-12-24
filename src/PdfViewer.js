import React, { Component } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import COLORS from "./const/colors";
import { Header, Icon } from "react-native-elements";

export default class PdfViewer extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.header}>
          <Icon
            onPress={() => {
              this.props.navigation.pop();
            }}
            name="arrow-back-ios"
            size={28}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Petunjuk</Text>
        </View>
        <PDFReader
          source={{
            uri: "https://absensi.sumbarprov.go.id/manual_book/office-assistant-manual-book.pdf",
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
