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

const { width, height } = Dimensions.get("screen");
const cardWidth = width / 2 - 36;
const cardWidthSlider = width / 1.2;
const cardHeightSlider = height / 4.5;
const menusWidth = width / 5.8;
const menusWidthPadding = width / 40;
const bottomSheetHeight = height / 2;
const CardRiwayat = ({ item }) => {
  console.log(item.masuk);
  return (
    <View style={style.card}>
      {item.masuk !== "" ? (
        <View style={{ marginBottom: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontSize: 14,
                marginRight: 20,
                fontWeight: "bold",
              }}
            >
              Absen Masuk
              {item.verifikasi_masuk_luar_kantor == "0" &&
              item.lampiran_masuk !== ""
                ? " (Belum di Verifikasi)"
                : item.verifikasi_masuk_luar_kantor == "1" &&
                  item.lampiran_masuk !== ""
                ? "Di ACC"
                : item.verifikasi_masuk_luar_kantor == "2" &&
                  item.lampiran_masuk !== ""
                ? "Di Tolak"
                : ""}
            </Text>
            <View></View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: COLORS.black,
              }}
            ></Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "30%", marginRight: 5 }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 14,
                  marginRight: 20,
                }}
              >
                Pukul {moment(item.masuk).format("LT")}
              </Text>
            </View>
            <View style={{ width: "30%", marginRight: 5 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                }}
              >
                {item.lampiran_masuk === "" ? "Dalam Kantor" : "Luar Kantor"}
              </Text>
            </View>
            <View style={{ width: "60%", marginRight: 5 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  fontWeight: "bold",
                }}
              >
                {item.lampiran_masuk === "" ? "" : item.kelompok_presensi_masuk}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      {item.keluar !== "" ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontSize: 14,
                marginRight: 20,
                fontWeight: "bold",
              }}
            >
              Absen Keluar
              {item.verifikasi_keluar_luar_kantor == "0" &&
              item.lampiran_keluar !== ""
                ? " (Belum di Verifikasi)"
                : item.verifikasi_keluar_luar_kantor == "1" &&
                  item.lampiran_keluar !== ""
                ? " (Di ACC)"
                : item.verifikasi_keluar_luar_kantor == "2" &&
                  item.lampiran_keluar !== ""
                ? " (Di Tolak)"
                : ""}
            </Text>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: COLORS.black,
              }}
            ></Text>
            {/* </View> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "30%", marginRight: 5 }}>
              <Text
                numberOfLines={1}
                style={{
                  color: COLORS.grey,
                  fontSize: 14,
                }}
              >
                Pukul {moment(item.keluar).format("LT")}
              </Text>
            </View>
            <View style={{ width: "30%", marginRight: 5 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                }}
              >
                {item.lampiran_keluar === "" ? "Dalam Kantor" : "Luar Kantor"}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  fontWeight: "bold",
                }}
              >
                {item.lampiran_keluar === ""
                  ? ""
                  : item.kelompok_presensi_keluar}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CardRiwayat;

const style = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    paddingVertical: 20,
  },
});
