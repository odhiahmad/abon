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

const CardRiwayatComponent = ({ item }) => {
  return (
    <View style={style.card}>
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "bold",
          color: COLORS.black,
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        {moment(item.keluar).format("dddd Do MMMM YYYY")}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "bold",
          color: COLORS.black,
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Masuk
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 5,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "30%" }}>
          <Text style={{ color: COLORS.black, fontSize: 14, marginRight: 20 }}>
            Jam {moment(item.masuk).format("LT")}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.grey,
              fontSize: 14,
            }}
          >
            {item.nama_lokasi_masuk}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "bold",
          color: COLORS.black,
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Keluar
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 5,
          alignItems: "center",
        }}
      >
        <View style={{ width: "30%" }}>
          <Text style={{ color: COLORS.black, fontSize: 14, marginRight: 20 }}>
            Jam {moment(item.keluar).format("LT")}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.grey,
              fontSize: 14,
            }}
          >
            {item.nama_lokasi_keluar}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardRiwayatComponent;

const style = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    marginTop: 5,
    paddingVertical: 20,
  },
});
