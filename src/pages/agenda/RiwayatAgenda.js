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
import { riwayatizin } from "./../../services/riwayatizin";
import CardRiwayatComponent from "./CardRiwayatComponent";
import CariComponent from "../../components/CariComponent";
import RadioButton from "../../components/RadioButton";

import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

require("moment/locale/id.js");
const { width, height } = Dimensions.get("screen");

const cardHeightBerita = height / 3.4;
const cardHeightViewBerita = height / 2 - 30;
const cardWidthBerita = width / 2.19;
export default function RiwayatAgenda({ navigation, route }) {
  const dataKoordinat = route.params;
  const [data, setData] = useState({
    data: [],
    id: null,
    loading: false,
    isRefreshing: false,
  });

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
    const response = await riwayatizin(dataGet);

    if (response.data.status === "RC202") {
      setData({
        ...data,
        loading: false,
      });
      setStatus(2);
    } else {
      const dataTemp = response.data.response;

      setStatus(1);
      setData({
        ...data,
        loading: false,
        data: dataTemp,
      });
      console.log(data.data);
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
    console.log(tanggal);
    const dataGet = {
      nip: username,
      periode: tanggal,
    };
    const response = await riwayatizin(dataGet);

    if (response.data.status === "RC202") {
      setData({
        ...data,
        loading: false,
      });
      setStatus(2);
    } else {
      const dataTemp = response.data.response;
      setStatus(1);
      setData({
        ...data,
        loading: false,
        data: dataTemp,
      });
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    getIndex();
  }, []);

  const CartCardNews = ({ item }) => {
    return (
      <TouchableOpacity underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={style.cartCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {moment(item.tanggal).format("dddd, D MMMM YYYY")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={{ width: "50%" }}>
              <Text style={{ color: COLORS.grey }}>Perihal</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={{}}>{item.perihal}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={{ width: "50%" }}>
              <Text style={{ color: COLORS.grey }}>Jenis Pengajuan Izin</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={{}}>{item.jenis_pengajuan_izin}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "50%" }}>
              <Text style={{ color: COLORS.grey }}>Status</Text>
            </View>

            <View
              style={{
                backgroundColor: COLORS.hijauTerang,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: COLORS.white }}>
                {item.status_pengajuan_izin}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <LoaderModal loading={data.loading} />
      <View style={style.header}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Riwayat Agenda
          </Text>
        </View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              getHistory("");
            }}
            style={{
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: COLORS.primary,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 2,
            }}
          >
            <FontAwesome5 name="book" color={COLORS.white} size={10} />
            <Text style={{ color: COLORS.white, fontSize: 12 }}> All</Text>
          </TouchableOpacity>
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
            <FontAwesome5 name="book" color={COLORS.white} size={10} />
            <Text style={{ color: COLORS.white, fontSize: 12 }}>
              {" "}
              Pilih Bulan
            </Text>
          </TouchableOpacity>
        </View>
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
          <Text>Tidak Ada Riwayat Agenda</Text>
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
