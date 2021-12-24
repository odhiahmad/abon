import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicon from "react-native-vector-icons/Ionicons";
import ErrorState from "./../../components/ErrorState";
import moment from "moment";
import Axios from "../../services/index";
import { biodata } from "../../services/biodata";
import { riwayathariini } from "../../services/riwayathariini";
import COLORS from "../../const/colors";
import LoaderModal from "../../components/loader";
import CardRiwayat from "./CardRiwayat";
import CardJadwal from "./CardJadwal";
import { AuthContext } from "./../../utils/authContext";

require("moment/locale/id.js");
const { width, height } = Dimensions.get("screen");
const cardWidthBerita = width / 2.3;
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
const HomeAbon = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dataPegawai, setDataPegawai] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [waktuKerja, setWaktuKerja] = useState([]);
  const [presensi, setPresensi] = useState([]);
  const [view, setView] = useState(0);
  const [riwayatData, setRiwayatData] = useState([]);
  const [riwayatStatus, setRiwayatStatus] = useState(0);

  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  const { signOut } = useContext(AuthContext);

  const [fetchingLoad, setFetchingLoad] = useState(false);

  useEffect(() => {
    getStorage();
  }, []);

  const getRefresh = async () => {
    setFetchingLoad(true);
    const username = await AsyncStorage.getItem("username");
    const token = await AsyncStorage.getItem("token");

    if (token !== "") {
      const dataBio = await biodata(username);
      const riwayat = await riwayathariini(username);

      if (dataBio.data.biodata[0].online == 0) {
        signOut();
      }

      const dataPegawai = dataBio.data.biodata;
      AsyncStorage.setItem("nama_lengkap", dataPegawai[0].nama_lengkap);
      AsyncStorage.setItem("nm_opd", dataPegawai[0].nm_opd);
      AsyncStorage.setItem("jabatan", dataPegawai[0].jabatan);
      AsyncStorage.setItem(
        "waktu_kerja",
        JSON.stringify(dataBio.data.waktu_kerja[0])
      );

      AsyncStorage.setItem("biodata", JSON.stringify(dataBio.data.biodata[0]));
      AsyncStorage.setItem("pesan", JSON.stringify(dataBio.data.pesan));
      AsyncStorage.setItem("durasi", JSON.stringify(dataBio.data.durasi));
      AsyncStorage.setItem("rekap", JSON.stringify(dataBio.data.rekap));
      AsyncStorage.setItem(
        "jadwal_presensi",
        JSON.stringify(dataBio.data.jadwal_presensi[0])
      );

      if (riwayat.data.status === "RC200") {
        setRiwayatStatus(1);
      }

      const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
      const nm_opd = await AsyncStorage.getItem("nm_opd");
      const jabatan = await AsyncStorage.getItem("jabatan");
      const waktu_kerja = await AsyncStorage.getItem("waktu_kerja");
      const jadwal_presensi = await AsyncStorage.getItem("jadwal_presensi");
      setWaktuKerja(JSON.parse(waktu_kerja));
      setPresensi(JSON.parse(jadwal_presensi));
      setRiwayatData(riwayat.data.response[0].jadwal);
      setDataPegawai({
        ...dataPegawai,
        nama: nama_lengkap,
        opd: nm_opd,
        jabatan: jabatan,
      });
      setView(1);
      setFetchingLoad(false);
    } else {
      setView(0);
      setFetchingLoad(false);
    }
  };
  const getStorage = async () => {
    const username = await AsyncStorage.getItem("username");
    const token = await AsyncStorage.getItem("token");

    if (token !== "") {
      const dataBio = await biodata(username);
      const riwayat = await riwayathariini(username);

      if (dataBio.data.biodata[0].online == 0) {
        signOut();
      }

      const dataPegawai = dataBio.data.biodata;
      AsyncStorage.setItem("nama_lengkap", dataPegawai[0].nama_lengkap);
      AsyncStorage.setItem("nm_opd", dataPegawai[0].nm_opd);
      AsyncStorage.setItem("jabatan", dataPegawai[0].jabatan);
      AsyncStorage.setItem(
        "waktu_kerja",
        JSON.stringify(dataBio.data.waktu_kerja[0])
      );

      AsyncStorage.setItem("biodata", JSON.stringify(dataBio.data.biodata[0]));
      AsyncStorage.setItem("pesan", JSON.stringify(dataBio.data.pesan));
      AsyncStorage.setItem("durasi", JSON.stringify(dataBio.data.durasi));
      AsyncStorage.setItem("rekap", JSON.stringify(dataBio.data.rekap));
      AsyncStorage.setItem(
        "jadwal_presensi",
        JSON.stringify(dataBio.data.jadwal_presensi)
      );

      if (riwayat.data.status === "RC200") {
        setRiwayatStatus(1);
      }

      const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
      const nm_opd = await AsyncStorage.getItem("nm_opd");
      const jabatan = await AsyncStorage.getItem("jabatan");
      const waktu_kerja = await AsyncStorage.getItem("waktu_kerja");
      const jadwal_presensi = await AsyncStorage.getItem("jadwal_presensi");
      setWaktuKerja(JSON.parse(waktu_kerja));
      setPresensi(JSON.parse(jadwal_presensi));
      setRiwayatData(riwayat.data.response[0].jadwal);
      setDataPegawai({
        ...dataPegawai,
        nama: nama_lengkap,
        opd: nm_opd,
        jabatan: jabatan,
      });
      setView(1);
    } else {
      setView(0);
    }
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={{ width: "30%" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../assets/logo.png")}
          />
        </View>

        <View style={{ flexDirection: "column", width: "70%" }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Selamat Datang!
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.black,
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {dataPegawai.nama}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: COLORS.black, fontSize: 14, marginBottom: 5 }}
          >
            {dataPegawai.jabatan}
          </Text>
          <Text numberOfLines={1} style={{ color: COLORS.grey, fontSize: 14 }}>
            {dataPegawai.opd}
          </Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                waktuKerja.masuk === ""
                  ? navigation.navigate("AmbilAbsen", {
                      jenis_presensi: "1",
                    })
                  : "";
              }}
              style={styles.cardAmbilAbsen}
            >
              <Text
                style={{
                  color: COLORS.white,
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                Absen Masuk
              </Text>
              {waktuKerja.masuk !== "" ? (
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    marginTop: 5,
                    fontSize: 24,
                  }}
                >
                  {waktuKerja.masuk}
                </Text>
              ) : (
                <Ionicon
                  name="finger-print-outline"
                  color={COLORS.white}
                  size={50}
                ></Ionicon>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AmbilAbsen", {
                  jenis_presensi: "2",
                });
              }}
              style={styles.cardAmbilAbsen}
            >
              <Text
                style={{
                  color: COLORS.white,
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                Absen Keluar
              </Text>
              {waktuKerja.keluar !== "" ? (
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    marginTop: 5,
                    fontSize: 24,
                  }}
                >
                  {waktuKerja.keluar}
                </Text>
              ) : (
                <Ionicon
                  name="finger-print-outline"
                  color={COLORS.white}
                  size={50}
                ></Ionicon>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "column", marginTop: 5 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 20,
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Jadwal</Text>
          </View>
          <FlatList
            data={presensi}
            renderItem={({ item, index }) => (
              <CardJadwal item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {riwayatStatus === 1 ? (
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
                paddingTop: 20,
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Riwayat Absen Hari Ini
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Riwayat")}>
                <Text style={{ color: COLORS.hijauTerang }}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={riwayatData}
              renderItem={({ item }) => <CardRiwayat item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <LoaderModal loading={loading} />
      <StatusBar
        animated={true}
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      {view === 1 ? (
        <FlatList
          refreshing={fetchingLoad}
          onRefresh={() => getStorage()}
          style={{ backgroundColor: COLORS.background }}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
        />
      ) : (
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 20,
              borderRadius: 10,
            }}
            onPress={() => getStorage()}
          >
            <Text style={{ color: COLORS.white }}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeAbon;
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 20,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: COLORS.white,
  },
  content: {
    backgroundColor: COLORS.white,

    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentRiwayat: {
    backgroundColor: COLORS.white,
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardAmbilAbsen: {
    width: cardWidthBerita,
    marginRight: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
