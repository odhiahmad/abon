import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import COLORS from "../../const/colors";
export default function SuksesViewIzin({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 50,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Sukses Mengajukan Izin
        </Text>
        <Image
          style={{ width: 300, height: 350 }}
          source={require("../../images/confirm.png")}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.replace("Agenda"));
          }}
          style={{
            width: "100%",
            padding: 20,
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            Lanjutkan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({});
