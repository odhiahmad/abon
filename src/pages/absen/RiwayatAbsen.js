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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../const/colors";
import LoaderModal from "../../components/loader";
import moment from "moment";
import { riwayatabsen } from "./../../services/riwayatabsen";
import CardRiwayatComponent from "./CardRiwayatComponent";
import CariComponent from "../../components/CariComponent";
import RadioButton from "../../components/RadioButton";
import { sort } from "./sort";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const sortList = [
  {
    label: "Tanggal A-Z",
    desc: "tanggal-asc",
    isActive: false,
  },
  {
    label: "Tanggal Z-A",
    desc: "tanggal-desc",
    isActive: true,
  },
];

require("moment/locale/id.js");
const { width, height } = Dimensions.get("screen");

const cardHeightBerita = height / 3.4;
const cardHeightViewBerita = height / 2 - 30;
const cardWidthBerita = width / 2.19;
export default function RiwayatAbsen({ navigation, route }) {
  const dataKoordinat = route.params;
  const [data, setData] = useState({
    data: [],
    id: null,
    loading: false,
    isRefreshing: false,
  });
  const [text, setText] = useState("");
  const [cari, setCari] = useState("Cari");
  const [modal, setModal] = useState(false);
  const [sortBy, setSortBy] = useState(sortList);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [status, setStatus] = useState(0);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTemp) => {
    const tanggalTemp = moment(dateTemp).format("L");
    const tahun = dateTemp.getFullYear();
    const bulan = tanggalTemp.substring(3, 5);

    const tanggal = tahun + "-" + bulan;
    getHistory(tanggal);
    console.log(tanggal);
    hideDatePicker();
  };

  const getHistory = async (tanggal) => {
    setData({
      ...data,
      loading: true,
      data: [],
    });
    const username = await AsyncStorage.getItem("username");
    const dataGet = {
      nip: username,
      periode: tanggal,
    };
    const response = await riwayatabsen(dataGet);

    if (response.data.status === "RC202") {
      setData({
        ...data,
        loading: false,
      });
      setStatus(2);
    } else {
      const dataTemp = response.data.response;
      console.log(dataTemp);
      const dataGG = [];
      for (let i = 0; i < dataTemp.length; i++) {
        if (dataTemp[i].jadwal[0].keluar !== "") {
          dataGG.push(dataTemp[i]);
        }
      }

      setData({
        ...data,
        loading: false,
        data: dataGG,
      });
      setStatus(1);
    }
  };

  const getIndex = async () => {
    setData({
      ...data,
      loading: true,
      data: [],
    });
    const username = await AsyncStorage.getItem("username");
    const tanggalSkrg = new Date();
    const tanggalTemp = moment(tanggalSkrg).format("L");
    const tahun = tanggalSkrg.getFullYear();
    const bulan = tanggalTemp.substring(3, 5);

    const tanggal = tahun + "-" + bulan;
    const dataGet = {
      nip: username,
      periode: tanggal,
    };
    const response = await riwayatabsen(dataGet);

    if (response.data.status === "RC202") {
      setData({
        ...data,
        loading: false,
      });
      setStatus(2);
    } else {
      const dataTemp = response.data.response;
      const dataGG = [];
      for (let i = 0; i < dataTemp.length; i++) {
        if (dataTemp[i].jadwal[0].masuk !== "") {
          dataGG.push(dataTemp[i]);
        }
      }

      setStatus(1);
      setData({
        ...data,
        loading: false,
        data: dataGG,
      });
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    getIndex();
  }, []);

  const handleSelectedTransaksi = (transaksi) => {
    navigate("DetailTransaksi", transaksi);
  };

  const handleSelectedSort = (dataSort) => {
    const newSortOrder = sortBy.map((sort) => {
      if (sort.label == dataSort.label) {
        sort.isActive = true;
      } else {
        sort.isActive = false;
      }
      return sort;
    });

    setSortBy(newSortOrder);
    const sortedUser = sort(data.data, dataSort.desc);
    setData({
      ...data,
      data: sortedUser,
    });
    setModalSort(!modalSort);
  };

  const handleSortModalVisible = () => {
    setModalSort(!modalSort);
  };
  const handleSearchInput = (text) => {
    if (!text) {
      setText("");
    } else {
      setText(text);
      console.log(text);
    }
  };

  const CartCardNews = ({ item }) => {
    return (
      <TouchableOpacity underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={style.cartCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                color: COLORS.black,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              {moment(item.jadwal[0].masuk).format("dddd, D MMMM YYYY")}
            </Text>
            <Text>{}</Text>
          </View>
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
                  {item.jadwal[0].verifikasi_masuk_luar_kantor == "0" &&
                  item.jadwal[0].lampiran_masuk !== ""
                    ? " (Belum di Verifikasi)"
                    : item.jadwal[0].verifikasi_masuk_luar_kantor == "1" &&
                      item.jadwal[0].lampiran_masuk !== ""
                    ? "Di ACC"
                    : item.jadwal[0].verifikasi_masuk_luar_kantor == "2" &&
                      item.jadwal[0].lampiran_masuk !== ""
                    ? "Di Tolak"
                    : ""}
                </Text>
                <View></View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.hijauTerang,
                  }}
                >
                  {parseInt(item.jadwal[0].validation_masuk) == 2
                    ? "Device Tidak Sesuai"
                    : ""}
                </Text>
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
                    Pukul {moment(item.jadwal[0].masuk).format("LT")}
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
                    {item.jadwal[0].lampiran_masuk === ""
                      ? "Dalam Kantor"
                      : "Luar Kantor"}
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
                    {item.jadwal[0].lampiran_masuk === ""
                      ? ""
                      : item.jadwal[0].kelompok_presensi_masuk}
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
                  {item.jadwal[0].verifikasi_keluar_luar_kantor == "0" &&
                  item.jadwal[0].lampiran_keluar !== ""
                    ? " (Belum di Verifikasi)"
                    : item.jadwal[0].verifikasi_keluar_luar_kantor == "1" &&
                      item.jadwal[0].lampiran_keluar !== ""
                    ? " (Di ACC)"
                    : item.jadwal[0].verifikasi_keluar_luar_kantor == "2" &&
                      item.jadwal[0].lampiran_keluar !== ""
                    ? " (Di Tolak)"
                    : ""}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.hijauTerang,
                  }}
                >
                  {parseInt(item.jadwal[0].validation_keluar) == 2
                    ? "Device Tidak Sesuai"
                    : ""}
                </Text>
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
                    Pukul {moment(item.jadwal[0].keluar).format("LT")}
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
                    {item.jadwal[0].lampiran_keluar === ""
                      ? "Dalam Kantor"
                      : "Luar Kantor"}
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
                    {item.jadwal[0].lampiran_keluar === ""
                      ? ""
                      : item.jadwal[0].kelompok_presensi_keluar}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <LoaderModal loading={data.loading} />
      <View style={style.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Riwayat Absen</Text>
        <TouchableOpacity
          onPress={showDatePicker}
          style={{
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="history" color={COLORS.white} size={10} />
          <Text style={{ color: COLORS.white, fontSize: 12 }}> History</Text>
        </TouchableOpacity>
      </View>
      {status === 1 ? (
        <FlatList
          data={data.data}
          style={{ backgroundColor: COLORS.background }}
          renderItem={({ item }) => <CartCardNews item={item} />}
          key={(item, index) => index.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : status === 2 ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text>Tidak Ada Data</Text>
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        ></View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    // elevation: 2,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    marginTop: 5,
    paddingVertical: 20,

    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    backgroundColor: "white",
    borderRadius: 4,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
