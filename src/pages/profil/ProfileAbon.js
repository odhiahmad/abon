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
  Clipboard,
  ToastAndroid,
  Platform,
  StatusBar,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircle from "react-native-progress-circle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/AntDesign";
import Axios from "../../services/index";
import { Header } from "react-native-elements";
import { AuthContext } from "./../../utils/authContext";
import COLORS from "./../../const/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { biodatadashboard } from "../../services/biodatadashboard";

export const onSignOut = () => AsyncStorage.clear();

const ProfileAbon = ({ navigation }) => {
  const [data, setData] = React.useState({
    nama_asn: "Nama ASN",
    username: "",
    jabatan: "Jabatan",
    nama_opd: "",
    isError: false,
    refreshing: false,
    isLoading: true,
    average: "",
    average_color: "",
    jumlah_telat: "",
    jam_telat: "",
    average_percent: "",
    pulang_cepat: "",
    durasi: [],
    rekap: [],
  });

  const [visible, setVisible] = useState(false);

  const feedData = async () => {
    const nama_asn = await AsyncStorage.getItem("nama_lengkap");
    const username = await AsyncStorage.getItem("username");
    const nama_opd = await AsyncStorage.getItem("nm_opd");
    const jabatan = await AsyncStorage.getItem("jabatan");

    const token = await AsyncStorage.getItem("username");

    const biodata = await biodatadashboard(username);

    const rekap = biodata.data.rekap;
    const durasi = biodata.data.durasi;

   
    setData({
      ...data,
      username: username,
      nama_asn: nama_asn,
      jabatan: jabatan,
      nama_opd: nama_opd,
      rekap: rekap[0],
      durasi: durasi[0],
    });
  };

  useEffect(() => {
    feedData();
  }, []);

  const _onRefresh = () => {
    setData({ ...data, refreshing: true, isError: false });
    feedData();
  };

  const { signOut } = useContext(AuthContext);

  const copy = (valueText) => {
    Clipboard.setString(valueText);

    if (Platform.OS === "android") {
      ToastAndroid.show("Copy Text", ToastAndroid.SHORT);
    } else {
      setVisible(true);
    }
  };

  const Header = () => {
    return (
      <View style={styles.boxHeader}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
          Informasi Profil
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "30%" }}>
            <FontAwesome
              name={"users"}
              size={60}
              style={{ color: COLORS.primary, textAlign: "center" }}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.black,
                marginBottom: 5,
              }}
            >
              {data.nama_asn}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: "normal",
                color: COLORS.black,
                marginBottom: 5,
              }}
            >
              {data.nama_opd}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
                color: COLORS.grey,
              }}
            >
              {data.jabatan}
            </Text>
            <TouchableOpacity
              onPress={() => copy(data.username)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.black,
                }}
              >
                # {data.username}{" "}
              </Text>
              <Ionicons name="copy" size={18} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const Footer = () => {
    return (
      <View>
        <View style={styles.boxProgress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Rata - rata Absen
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ProgressCircle
              percent={parseInt(data.durasi.average_percent)}
              radius={50}
              borderWidth={8}
              color={COLORS.primary}
              shadowColor={COLORS.hijauTerang}
              bgColor={COLORS.white}
            >
              <Text style={{ fontSize: 18 }}>{data.durasi.average}</Text>
            </ProgressCircle>
          </View>
        </View>
        <View style={styles.boxProgress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Informasi Absen
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PdfViewer")}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
              }}
            >
              <FontAwesome
                name={"download"}
                size={10}
                style={{ color: COLORS.white, marginRight: 3 }}
              />
              <Text
                style={{
                  color: COLORS.white,

                  fontSize: 12,
                }}
              >
                Panduan
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: 16 }}>
              Durasi Telat
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>
              {data.rekap.durasi_telat}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: 16 }}>
              Durasi Cepat Pulang
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>
              {data.rekap.durasi_cepat_pulang}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: 16 }}>
              Total Cepat Pulang
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>
              {data.rekap.total_cepat_pulang}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: 16 }}>
              Total Telat
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>
              {data.rekap.total_telat}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profil</Text>
        <TouchableOpacity
          onPress={() => signOut()}
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
          <FontAwesome name="sign-out-alt" color={COLORS.white} size={10} />
          <Text style={{ color: COLORS.white, fontSize: 12 }}> Sign Out</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ backgroundColor: COLORS.background }}
        ListFooterComponent={Footer}
        ListHeaderComponent={Header}
      />
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ backgroundColor: COLORS.hijauTerang }}
      >
        <Text style={{ color: COLORS.white }}>Copied {data.username}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default ProfileAbon;
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
  },

  wrapper: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  boxHeader: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  boxProgress: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 5,
    backgroundColor: COLORS.white,
    flexDirection: "column",
  },
  floatButton: {
    borderRadius: 30,
    backgroundColor: "#ee6e73",
    position: "absolute",
    bottom: 10,
    alignItems: "center",
  },
});
