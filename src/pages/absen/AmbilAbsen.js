import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconB from "react-native-vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import * as Device from "expo-device";
import Axios from "../../services/index";
import { BottomSheet, Header, ListItem } from "react-native-elements";
import LoaderModal from "./../../LoaderModal";
import COLORS from "../../const/colors";
import { cekdistance } from "./../../services/cekdistance";
import { absen } from "./../../services/absen";
import { absenluar } from "./../../services/absenluar";
import { opsiabsen } from "./../../services/opsiabsen";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AwesomeAlert from "react-native-awesome-alerts";
import { ThirdButton } from "../../const/button";
import ImgToBase64 from "react-native-image-base64";
import * as FileSystem from "expo-file-system";

const AmbilAbsen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    lat: "",
    long: "",
    locationResult: null,
    distance: 0,
    isLoading: true,
    showAlert: false,
    opd: "",
    uri: "",
    username: "",
    jenis_presensi: route.params.jenis_presensi,
    locationStatus: null,
    distance_max: null,
    value: "",
    id_koordinat: null,
    qrcode: null,
    pesan: "Pastikan anda berada dilokasi kantor",
    isVisible: false,
    isVisiblePilihan: false,
    showAlertPesan: false,
    pilihanAbsenLuar: null,

    suksesAbsen: false,
    pesanTapAbsen: "",
    opsiAbsen: [],
  });

  const [pilih, setPilih] = useState(0);
  useEffect(() => {
    _getLocationAsync();
  }, []);

  const setBottomSheetVisibility = () => {
    setData({ ...data, isVisible: !data.isVisible });
  };

  const setBottomSheetVisibilityPilihan = () => {
    setData({ ...data, isVisiblePilihan: !data.isVisiblePilihan });
  };

  const showAlert = () => {
    setData({ ...data, showAlert: true });
  };

  const hideAlert = () => {
    setData({ ...data, showAlert: false });
  };

  const showAlertPesan = () => {
    setData({
      ...data,
      showAlertPesan: true,
    });
  };
  const hideAlertPesan = () => {
    setData({
      ...data,
      showAlertPesan: false,
    });
  };

  const _pickFoto = (valueAlert) => {
    setModalVisible(false);
    navigation.navigate("TakePhoto", {
      jenis_presensi: data.jenis_presensi,
      lat: data.lat,
      long: data.long,
      valueAlert: valueAlert,
    });
  };

  const alertDialog = (valueAlert) => {
    console.log(valueAlert);
    Alert.alert("Pesan", data.pesanTapAbsen, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Lanjutkan",
        onPress: () => {
          if (valueAlert === 0) {
            setModalVisible(true);
            setPilih(0);
          } else if (valueAlert === 1) {
            setPilih(1);
            setModalVisible(true);
          } else {
            _pickFoto();
          }
        },
      },
    ]);
  };

  const _pickDocument = async (valueAlert) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });
    if (result.type !== "cancel") {
      setModalVisible(false);
      setData({
        ...data,
        isLoading: true,
      });

      let filename;
      let type;

      filename = result.name;
      type = result.name.split(".").reverse()[0];

      const uri = FileSystem.documentDirectory + result.name;
      await FileSystem.copyAsync({
        from: result.uri,
        to: uri,
      });

      const database64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });

      const device_id = await AsyncStorage.getItem("device_id");
      const device_model = await AsyncStorage.getItem("device_model");
      const device_device = await AsyncStorage.getItem("device_device");
      const device_hardware = await AsyncStorage.getItem("device_hardware");
      const username = await AsyncStorage.getItem("username");
      const biodata = await AsyncStorage.getItem("biodata");
      const biodataTemp = JSON.parse(biodata);

      console.log(device_id);
      const dataForm = new FormData();
      dataForm.append("nip", username);
      dataForm.append("id_koordinat", data.id_koordinat);
      dataForm.append("latitude", data.lat);
      dataForm.append("longitude", data.long);
      dataForm.append("image_tag", filename);
      dataForm.append("image_data", database64);
      dataForm.append("store_device_id", device_id);
      dataForm.append("device_model", device_model);
      dataForm.append("device_device", device_device);
      dataForm.append("device_hardware", device_hardware);
      dataForm.append("metode", "0");
      dataForm.append("jenis_presensi", data.jenis_presensi);
      dataForm.append("jenis_opsi", valueAlert);
      dataForm.append("package_name[0]", "tes");

      const ambilAbsen = await absenluar(dataForm);

      if (ambilAbsen.data.status == "RC200") {
        setData({
          ...data,
          isLoading: false,
          suksesAbsen: true,
        });
        navigation.navigate("SuccessAbsen", {
          pesanAbsen: ambilAbsen.data.response,
        });
      } else {
        setData({
          ...data,
          isLoading: false,
          suksesAbsen: false,
        });
        Alert.alert("Notif", ambilAbsen.data.response);
      }
    }
  };

  //Absen Masuk
  const tap_absen_in = async () => {
    setData({
      ...data,
      showAlert: false,
      isLoading: true,
    });

    // setData({ ...data, isLoading: true });

    const device_id = await AsyncStorage.getItem("device_id");
    const device_model = await AsyncStorage.getItem("device_model");
    const device_device = await AsyncStorage.getItem("device_device");
    const device_hardware = await AsyncStorage.getItem("device_hardware");
    const username = await AsyncStorage.getItem("username");
    const biodata = await AsyncStorage.getItem("biodata");
    const biodataTemp = JSON.parse(biodata);

    console.log(device_id);
    const dataForm = new FormData();
    dataForm.append("nip", username);
    dataForm.append("id_koordinat", data.id_koordinat);
    dataForm.append("latitude", data.lat);
    dataForm.append("longitude", data.long);
    dataForm.append("store_device_id", device_id);
    dataForm.append("device_model", device_model);
    dataForm.append("device_device", device_device);
    dataForm.append("device_hardware", device_hardware);
    dataForm.append("metode", "0");
    dataForm.append("jenis_presensi", data.jenis_presensi);
    dataForm.append("package_name[0]", "tes");

    const ambilAbsen = await absen(dataForm);

    if (ambilAbsen.data.status == "RC200") {
      setData({
        ...data,
        isLoading: false,
        suksesAbsen: true,
      });

      navigation.navigate("SuccessAbsen", {
        pesanAbsen: ambilAbsen.data.response,
      });
    } else {
      setData({
        ...data,
        isLoading: false,
        suksesAbsen: false,
      });

      Alert.alert("Notif", ambilAbsen.data.response);
    }
  };

  //Absen Keluar

  //Get Lokasi
  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setData({ ...data, locationStatus: status, isLoading: true });
    if (status !== "granted") {
      setData({
        ...data,
        locationResult: "Permission to access location was denied",
        isLoading: false,
      });
    } else {
      let location = await Location.getCurrentPositionAsync({
        accuracy:
          Platform.OS === "ios"
            ? Location.Accuracy.Lowest
            : Location.Accuracy.Lowest,
      });

      const { mocked } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1,
      });

      if (mocked === true) {
        setData({
          ...data,
          isLoading: false,
          locationResult: JSON.stringify(location),
          locationStatus: "Anda terdektesi menggunakan fake gps",
          value: 2,
        });
      } else {
        const lat = location.coords.latitude.toString();
        const long = location.coords.longitude.toString();

        const username = await AsyncStorage.getItem("username");
        const pesanStorageTemp = await AsyncStorage.getItem("pesan");
        const pesanStorage = JSON.parse(pesanStorageTemp);

        const dataForm = new FormData();
        dataForm.append("nip", username);
        dataForm.append("latitude", lat);
        dataForm.append("longitude", long);
        const dataDistanceTemp = await cekdistance(dataForm);
        const opsiabsentemporary = await opsiabsen();
        let dataOpd = dataDistanceTemp.data.response;

        console.log(opsiabsentemporary.data.response);
        let id_koordinat = "";
        let distanceTemp = 0;
        let valueTemp = 0;
        for (let i = 0; i < dataOpd.length; i++) {
          if (dataOpd[i].value === "1") {
            distanceTemp = dataOpd[i].distance;
            valueTemp = 1;
            id_koordinat = dataOpd[i].id_koordinat;

            break;
          } else {
            valueTemp = 0;
          }
        }

        setData({
          ...data,
          isLoading: false,
          locationResult: JSON.stringify(location),
          lat: lat,
          long: long,
          locationStatus: "granted",
          distance: distanceTemp,
          value: valueTemp,
          id_koordinat: id_koordinat,
          pesanTapAbsen: pesanStorage.pesan_tapabsenluar_menu,
          opsiAbsen: opsiabsentemporary.data.response,
        });
      }
    }
  };

  if (data.locationStatus !== "granted") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <IconB
          name="location-off"
          size={50}
          style={{ color: "#00AEEF", marginBottom: 20 }}
        />
        <Text style={{ textAlign: "center" }}>
          Kami mendeteksi anda tidak mengaktifkan GPS atau tidak memberikan
          akses lokasi terhadap aplikasi ini
        </Text>
      </View>
    );
  }

  const Footer = () => {
    return (
      <View>
        <View>
          <View style={styles.content}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                backgroundColor: "white",
                width: "35%",
              }}
            >
              <FontAwesome
                name={"building"}
                size={80}
                style={{ color: COLORS.primary, textAlign: "center" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: COLORS.black,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Absen di Kantor
              </Text>
            </View>
            <View
              style={{ justifyContent: "center", padding: 15, width: "65%" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  textAlign: "center",
                }}
              >
                {data.value === 0
                  ? "Anda berada di luar kantor"
                  : data.value === 1
                  ? "Jarak anda dengan kantor " + data.distance + " meter"
                  : data.value === 2
                  ? "Anda terdeteksi menggunakan fake gps!!!"
                  : ""}
              </Text>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                {data.value === 0 ? (
                  <TouchableOpacity
                    style={{
                      widht: "200",
                      borderRadius: 10,
                      height: 40,
                      backgroundColor: COLORS.primary,
                      marginBottom: 10,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => _getLocationAsync()}
                  >
                    <FontAwesome
                      name={"map-marker-alt"}
                      size={15}
                      style={{ color: COLORS.white, textAlign: "center" }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        color: COLORS.white,
                        fontSize: 17,
                      }}
                    >
                      {" "}
                      Update Lokasi
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      widht: "200",
                      borderRadius: 10,
                      height: 40,
                      backgroundColor: COLORS.primary,
                      marginBottom: 10,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Ambil Absen",
                        "Apakah anda yakin ingin mengambil absen?",
                        [
                          {
                            text: "Kembali",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Ya,Lanjutkan",
                            onPress: () => tap_absen_in(),
                          },
                        ]
                      );
                    }}
                  >
                    <FontAwesome
                      name={"clipboard"}
                      size={15}
                      style={{ color: COLORS.white, textAlign: "center" }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        color: COLORS.white,
                        fontSize: 17,
                      }}
                    >
                      {" "}
                      Ambil Absen
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {/* navigate("TakePhoto",{absen_type: data.absen_type, lat: data.lat, long: data.long}) */}
          <TouchableOpacity
            onPress={() => alerSelectDialog}
            style={styles.content}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                backgroundColor: "white",
                width: "35%",
              }}
            >
              <FontAwesome
                name={"users"}
                size={60}
                style={{ color: COLORS.primary, textAlign: "center" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: COLORS.black,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Absen di Luar Kantor
              </Text>
            </View>
            <View
              style={{ justifyContent: "center", padding: 15, width: "65%" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Silahkan pilih opsi untuk mengambil absen diluar kantor
              </Text>
              <TouchableOpacity
                style={{
                  widht: "200",
                  borderRadius: 10,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  marginBottom: 10,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => alertDialog(0)}
              >
                <FontAwesome
                  name={"upload"}
                  size={15}
                  style={{ color: COLORS.white, textAlign: "center" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    color: COLORS.white,
                    fontSize: 17,
                  }}
                >
                  {" "}
                  Upload Dokumen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  widht: "200",
                  borderRadius: 10,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  marginBottom: 10,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => alertDialog(1)}
              >
                <FontAwesome
                  name={"camera"}
                  size={15}
                  style={{ color: COLORS.white, textAlign: "center" }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    color: COLORS.white,
                    fontSize: 17,
                  }}
                >
                  {" "}
                  Kirim Foto
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoaderModal loading={data.isLoading} />
      <View style={styles.header}>
        <IconB name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ambil Absen</Text>
      </View>
      <FlatList
        style={{ backgroundColor: COLORS.background }}
        ListFooterComponent={Footer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View></View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontSize: 20 }}>Close</Text>
                <IconB name="close" size={25} />
              </TouchableOpacity>
            </View>
            {data.opsiAbsen.map((value) => {
              return (
                <View>
                  <ThirdButton
                    onPress={() => {
                      if (pilih === 0) {
                        _pickDocument(value.id);
                      } else {
                        _pickFoto(value.id);
                      }
                    }}
                    title={value.keterangan_presensi}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AmbilAbsen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: COLORS.white,
  },

  textBold: {
    fontWeight: "bold",
    color: COLORS.black,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",

    marginTop: 22,
  },
  modalView: {
    width: "95%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingBottom: 35,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
