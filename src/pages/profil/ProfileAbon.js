import React, { useContext, useEffect } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircle from "react-native-progress-circle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import Axios from "../../services/index";
import { Header } from "react-native-elements";
import { AuthContext } from "./../../utils/authContext";
import COLORS from "./../../const/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
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
  });

  const feedData = async () => {
    const nama_asn = await AsyncStorage.getItem("nama_lengkap");
    const username = await AsyncStorage.getItem("username");
    const nama_opd = await AsyncStorage.getItem("nm_opd");
    const jabatan = await AsyncStorage.getItem("jabatan");

    const token = await AsyncStorage.getItem("username");

    setData({
      ...data,
      nama_asn: nama_asn,
      jabatan: jabatan,
      nama_opd: nama_opd,
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
  const Footer = () => {
    return (
      <View>
        <View style={styles.boxHeader}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 20 }}>
            Informasi Profil
          </Text>
          <View style={{ flexDirection: "row" }}>
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
                  fontSize: 16,
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
                  fontSize: 12,
                  fontWeight: "normal",
                  color: COLORS.black,
                }}
              >
                {data.nama_opd}
              </Text>
              <Text
                style={{
                  fontSize: 12,

                  marginBottom: 5,
                  color: COLORS.grey,
                }}
              >
                {data.jabatan}
              </Text>
            </View>
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
            <Text style={{ fontWeight: "bold" }}>Informasi Absen</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PdfViewer")}
              style={{
                padding: 5,
                borderRadius: 3,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
              }}
            >
              <Icon
                name={"download"}
                size={12}
                style={{ color: COLORS.white, textAlign: "center", padding: 3 }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                  fontSize: 10,
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
              Datang Telat
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>2 Kali</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, fontSize: 16 }}>
              Persentasi Absen
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 16 }}>8.0</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                marginTop: 30,
                width: "100%",
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                padding: 15,
                alignItems: "center",
              }}
              onPress={() => signOut()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profil</Text>
      </View>
      <FlatList
        style={{ backgroundColor: COLORS.background }}
        ListFooterComponent={Footer}
      />
    </SafeAreaView>
  );
};

export default ProfileAbon;
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
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
