import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { Header } from "react-native-elements";
import COLORS from "../../const/colors";
import { ThirdButton } from "../../const/button";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { ajukanizin } from "./../../services/ajukanizin";
import AwesomeAlert from "react-native-awesome-alerts";
import { jenisizin } from "./../../services/jenisizin";
import LoaderModal from "./../../LoaderModal";

require("moment/locale/id.js");

const AgendaAbon = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pilihanTemp, setPilihanTemp] = useState(0);
  const [data, setData] = useState({
    jenisIzin: 0,
    jenisIzinLabel: "",
    jenisIzinPilihan: 0,
    pilihanTanggal: 0,
    perihal: "",
    perihalLabel: "",
    tanggalAwal: "",
    tanggalAkhir: "",

    pilihTanggal: 0,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [picker, setPicker] = useState(false);
  const [status, setStatus] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);
  const [pesanIzin, setPesanIzin] = useState("");
  const [pilihan, setPilihan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusView, setStatusView] = useState(0);
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    getJenisIzin();
  }, []);

  const showAlertPesan = () => {
    setShowAlert(true);
  };
  const hideAlertPesan = () => {
    setShowAlert(false);
  };

  const showAlertPesanConfirm = () => {
    setShowAlertConfirm(true);
  };
  const hideAlertPesanConfirm = () => {
    setShowAlertConfirm(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const getJenisIzin = async () => {
    setLoading(true);
    const dataJenisIzin = await jenisizin();

    if (dataJenisIzin.status == "200") {
      setPilihan(dataJenisIzin.data.response);

      setLoading(false);
    } else {
      setLoading(false);
      setStatusView(1);
    }
  };

  const handleConfirm = (date) => {
    const tanggalTemp = moment(date).format("L");
    const tahun = date.getFullYear();
    const bulan = tanggalTemp.substring(3, 5);
    const hari = tanggalTemp.substring(0, 2);

    const tanggal = tahun + "-" + bulan + "-" + hari;

    setData({
      ...data,
      tanggalAwal: tanggal,
      tanggalAkhir: tanggal,
    });

    hideDatePicker();
  };

  const showPicker = () => {
    setPicker(true);
  };

  const hidePicker = () => {
    setPicker(false);
  };

  const handleConfirmPicker = (date) => {
    const tanggalTemp = moment(date).format("L");
    const tahun = date.getFullYear();
    const bulan = tanggalTemp.substring(3, 5);
    const hari = tanggalTemp.substring(0, 2);

    const tanggal = tahun + "-" + bulan + "-" + hari;

    setData({
      ...data,
      tanggalAkhir: tanggal,
    });

    console.log(tanggal);
    hidePicker();
  };

  const pilihJenis = (value) => {
    if (value.id_izin == 1 || value.id_izin == 2) {
      setData({
        ...data,
        jenisIzin: 1,
        jenisIzinPilihan: value.id_izin,
        jenisIzinLabel: value.keterangan,
      });
    } else {
      setData({
        ...data,
        jenisIzin: 2,
        jenisIzinPilihan: value.id_izin,
        jenisIzinLabel: value.keterangan,
      });
    }
  };

  const confirm = async () => {
    console.log(data.jenisIzinPilihan);
    if (
      data.perihal == "" ||
      data.tangggalAwal == "" ||
      data.tanggalAkhir == "" ||
      data.jenisIzin == ""
    ) {
      Alert.alert("Isi Semua Data Terlebih Dahulu");
    } else {
      const username = await AsyncStorage.getItem("username");

      const form = new FormData();
      form.append("id_izin", data.jenisIzinPilihan);
      form.append("tanggal", "");
      form.append("perihal", data.perihal);
      form.append("nip", username);
      form.append("tanggal_awal", data.tanggalAwal);
      form.append("tanggal_akhir", data.tanggalAkhir);

      const izinsubmit = await ajukanizin(form);

      if (izinsubmit.data.status == "RC200") {
        reset();
        navigation.navigate("SuccessAbsen", {
          pesanAbsen: izinsubmit.data.response,
        });
      } else {
        Alert.alert(izinsubmit.data.response);
      }
    }
  };

  const reset = () => {
    setData({
      ...data,
      jenisIzin: 0,
      jenisIzinLabel: "",
      jenisIzinPilihan: 0,
      pilihanTanggal: 0,
      perihal: "",
      perihalLabel: "",
      tanggalAwal: "",
      tanggalAkhir: "",
      pilihTanggal: 0,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <LoaderModal loading={loading} />
      {parseInt(statusView) === 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Agenda</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RiwayatAgenda");
              }}
              style={{
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: COLORS.primary,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="history" color={COLORS.white} size={10} />
              <Text style={{ color: COLORS.white, fontSize: 12 }}>
                {" "}
                Riwayat Agenda
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 5, flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                padding: 20,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
                backgroundColor: COLORS.hijauTerang,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {data.jenisIzinLabel == ""
                  ? "Pilih Jenis Izin"
                  : data.jenisIzinLabel}
              </Text>
            </TouchableOpacity>

            <TextInput
              mode="outlined"
              label="Perihal"
              // maxLength={12}
              theme={{
                colors: {
                  placeholder: "black",
                  text: "black",
                  primary: "black",
                  underlineColor: "transparent",
                  background: "#fff",
                },
              }}
              value={data.isi}
              onChangeText={(text) =>
                setData({
                  ...data,
                  perihal: text,
                })
              }
            />
            {data.jenisIzin == 1 ? (
              <TouchableOpacity
                onPress={showDatePicker}
                style={{
                  padding: 20,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                  backgroundColor: COLORS.hijauTerang,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {data.tanggalAwal == ""
                    ? "Pilih Tanggal Izin"
                    : "Tanggal Izin " + data.tanggalAwal}
                </Text>
              </TouchableOpacity>
            ) : data.jenisIzin === 2 ? (
              <View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    padding: 20,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                    backgroundColor: COLORS.hijauTerang,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {data.tanggalAwal == ""
                      ? "Pilih Tanggal Awal Izin"
                      : "Tanggal Awal " + data.tanggalAwal}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={showPicker}
                  style={{
                    padding: 20,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                    marginBottom: 15,
                    backgroundColor: COLORS.hijauTerang,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {data.tanggalAkhir == ""
                      ? "Pilih Tanggal Akhir Izin"
                      : "Tanggal Akhir " + data.tanggalAkhir}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}

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
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View></View>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 20 }}>Close</Text>
                      <IconMaterial name="close" size={25} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    {pilihan.map((value) => {
                      return (
                        <View>
                          <ThirdButton
                            onPress={() => {
                              setModalVisible(false);
                              pilihJenis(value);
                            }}
                            title={value.keterangan}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              marginHorizontal: 20,

              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => reset()}
              style={{
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                backgroundColor: COLORS.hijauTerang,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Ajukan Izin",
                  "Apakah anda yakin ingin mengajukan izin?",
                  [
                    {
                      text: "Kembali",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "Ya,Lanjutkan", onPress: () => confirm() },
                  ]
                );
              }}
              style={{
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 5,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Ajukan Izin
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={picker}
            mode="date"
            onConfirm={handleConfirmPicker}
            onCancel={hidePicker}
          />
        </View>
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
            onPress={() => getJenisIzin()}
          >
            <Text style={{ color: COLORS.white }}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AgendaAbon;
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
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
