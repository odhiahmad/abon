import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import COLORS from "../../const/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
require("moment/locale/id.js");

const CardJadwal = ({ item, index }) => {
  return (
    <View style={{ padding: 20, backgroundColor: COLORS.white }}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: COLORS.grey }}>Absen ke-{index + 1}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text>Mulai Presensi</Text>
        <Text style={{ color: COLORS.grey }}>
          {moment(item.mulai_presensi).format("h:mm a")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text>Akhir Presensi</Text>
        <Text style={{ color: COLORS.grey }}>
          {moment(item.akhir_presensi).format("h:mm a")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text>Jam Masuk</Text>
        <Text style={{ color: COLORS.grey }}>
          {moment(item.jam_masuk).format("h:mm a")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Jam Pulang</Text>
        <Text style={{ color: COLORS.grey }}>
          {moment(item.jam_pulang).format("h:mm a")}
        </Text>
      </View>
    </View>
  );
};

export default CardJadwal;

const style = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    paddingVertical: 20,
  },
});
