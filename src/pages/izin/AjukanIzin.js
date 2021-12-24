import React, { Component } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-datepicker";
import COLORS from "../../const/colors";
import Axios from "../../services/index";
import LoaderModal from "./../../LoaderModal";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import {
  BottomSheet,
  Button,
  Header,
  Icon,
  Input,
  ListItem,
} from "react-native-elements";
import { TextInput } from "react-native-paper";

class AjukanIzin extends Component {
  reset() {
    this.props.navigation.navigate("Agenda");
  }

  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      isLoading: false,
      perihal: "",
      username: "",
      tanggalAwal: "",
      tanggalAkhir: "",
      pilihanNama: "",
      jenisIzin: undefined,
      isVisible: false,
      items2: [
        {
          label: "Hadir Terlambat",
          value: "1",
        },
        {
          label: "Pulang lebih cepat",
          value: "2",
        },
        {
          label: "Cuti",
          value: "4",
        },
        {
          label: "Sakit",
          value: "5",
        },
        {
          label: "Izin",
          value: "6",
        },
        {
          label: "Dinas Luar",
          value: "7",
        },
        {
          label: "Tugas Pendidikan (Diklat, Workshop, dll",
          value: "8",
        },
      ],
    };

    this.reset = this.reset.bind(this);
    AsyncStorage.getItem("username", (error, result) => {
      if (result) {
        this.setState({
          username: result,
        });
      }
    });
    AsyncStorage.getItem("startDate", (error, result) => {
      if (result) {
        this.setState({
          tanggalAwal: result,
        });
      }
    });
    AsyncStorage.getItem("endDate", (error, result) => {
      if (result) {
        this.setState({
          tanggalAkhir: result,
        });
      }
    });
  }

  handleSaveClick = async () => {
    if (this.state.jenisIzin == "1") {
      this.setState({
        isLoading: true,
      });

      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAwal,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "2") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAwal,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "4") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == "" ||
        this.state.tanggalAkhir == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAkhir,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "5") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == "" ||
        this.state.tanggalAkhir == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAkhir,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "6") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == "" ||
        this.state.tanggalAkhir == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAkhir,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "7") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == "" ||
        this.state.tanggalAkhir == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAkhir,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else if (this.state.jenisIzin == "8") {
      this.setState({
        isLoading: true,
      });
      if (
        this.state.jenisIzin == "" ||
        this.state.perihal == "" ||
        this.state.tanggalAwal == "" ||
        this.state.tanggalAkhir == ""
      ) {
        Alert.alert("Mohon Isi Semua Data");
        this.setState({
          isLoading: false,
        });
      } else {
        let details = {
          id_izin: this.state.jenisIzin,
          tanggal: "",
          perihal: this.state.perihal,
          nip: this.state.username,
          tanggal_awal: this.state.tanggalAwal,
          tanggal_akhir: this.state.tanggalAkhir,
        };
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(_baseURL_ + "izin", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == "success") {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
              this.reset();
            } else {
              Alert.alert(json.catatan);
              this.setState({
                isLoading: false,
              });
            }
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
            console.error(error);
            Alert.alert("Anda sedang tidak terhubung ke jaringan internet");
          });
      }
    } else {
      Alert.alert("Mohon Isi Semua Data");
      this.setState({
        isLoading: false,
      });
    }
  };
  setBottomSheetVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    const list = [
      {
        title: "Pilih Jenis Izin",
        containerStyle: { backgroundColor: COLORS.primary },
        titleStyle: { color: "white" },
      },
      {
        title: "Hadir Terlambat",
        value: "1",
      },
      {
        title: "Pulang lebih cepat",
        value: "2",
      },
      {
        title: "Cuti",
        value: "4",
      },
      {
        title: "Sakit",
        value: "5",
      },
      {
        title: "Izin",
        value: "6",
      },
      {
        title: "Dinas Luar",
        value: "7",
      },
      {
        title: "Tugas Pendidikan (Diklat, Workshop, dll)",
        value: "8",
      },
      {
        title: "Keluar",
        titleStyle: { color: "black" },
        onPress: this.setBottomSheetVisibility,
      },
    ];

    return (
      <SafeAreaView style={{ backgroundColor: COLORS.white }}>
        <LoaderModal loading={this.state.isLoading} />
        <View style={styles.header}>
          <IconMaterial name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Form Pengajuan Izin
          </Text>
        </View>
        <BottomSheet isVisible={this.state.isVisible}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={(value) => {
                l.title !== "Keluar"
                  ? this.setState({
                      jenisIzin: l.value,
                      isVisible: !this.state.isVisible,
                      pilihanNama: l.title,
                    })
                  : this.setState({
                      pilihanNama: "",
                      isVisible: !this.state.isVisible,
                    });
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>

        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: COLORS.hijauTerang,
              borderRadius: 10,

              padding: 15,
              marginBottom: 10,
              alignItems: "center",
            }}
            onPress={this.setBottomSheetVisibility}
          >
            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
              Pilih Jenis Izin
            </Text>
          </TouchableOpacity>
          {this.state.pilihanNama === "" ? (
            <View></View>
          ) : (
            <View>
              <TextInput
                mode="outlined"
                label="Jenis Izin"
                autoCapitalize="words"
                theme={{
                  colors: {
                    placeholder: "black",
                    text: "black",
                    primary: "black",
                    underlineColor: "transparent",
                    background: "#fff",
                  },
                }}
                value={this.state.pilihanNama}
                onChangeText={(text) => this.setState({ perihal: text })}
              />
            </View>
          )}
          <TextInput
            style={{ marginBottom: 10 }}
            mode="outlined"
            label="Perihal"
            autoCapitalize="words"
            theme={{
              colors: {
                placeholder: "black",
                text: "black",
                primary: "black",
                underlineColor: "transparent",
                background: "#fff",
              },
            }}
            value={this.state.perihal}
            onChangeText={(text) => this.setState({ perihal: text })}
          />

          {this.state.jenisIzin == "1" && ( //Hadir Terlambat
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Tanggal</Text>

              <DatePicker
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 5,
                  justifyContent: "space-between",
                  borderColor: "gray",
                  backgroundColor: "white",
                  color: "black",
                }}
                mode="date"
                date={this.state.tanggalAwal}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                  },
                  dateInput: {
                    marginLeft: 46,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "#e0e0e0",
                    alignItems: "flex-start",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ tanggalAwal: date });
                }}
              />
            </View>
          )}
          {this.state.jenisIzin == "2" && ( //Pulang lebih cepat
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Tanggal :</Text>
              <DatePicker
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 5,
                  justifyContent: "space-between",
                  borderColor: "gray",
                  backgroundColor: "white",
                  color: "black",
                }}
                mode="date"
                date={this.state.tanggalAwal}
                format="YYYY-MM-DD"
                placeholder="Pilih Tanggal"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                  },
                  dateInput: {
                    marginLeft: 46,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "#e0e0e0",
                    alignItems: "flex-start",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ tanggalAwal: date });
                }}
              />
            </View>
          )}
          {this.state.jenisIzin == "4" && ( //Cuti
            <View>
              {this.state.tanggalAkhir === "--" ? (
                <View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="ggg"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      showIcon={false}
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAkhir}
                      format="YYYY-MM-DD"
                      showIcon={false}
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}

          {this.state.jenisIzin == "5" && ( //Sakit
            <View>
              {this.state.tanggalAkhir === "--" ? (
                <View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      showIcon={false}
                      placeholder="ggg"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      showIcon={false}
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAkhir}
                      format="YYYY-MM-DD"
                      showIcon={false}
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
          {this.state.jenisIzin == "6" && ( //Izin
            <View>
              {this.state.tanggalAkhir === "--" ? (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="ggg"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAkhir}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
          {this.state.jenisIzin == "7" && ( //Dinas Luar
            <View>
              {this.state.tanggalAkhir === "--" ? (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="ggg"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAkhir}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
          {this.state.jenisIzin == "8" && ( //Tugas Pendidikan
            <View>
              {this.state.tanggalAkhir === "--" ? (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="ggg"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Awal:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAwal: date });
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      Tanggal Akhir:
                    </Text>
                    <DatePicker
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        marginTop: 5,
                        justifyContent: "space-between",
                        borderColor: "gray",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      mode="date"
                      date={this.state.tanggalAkhir}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                        },
                        dateInput: {
                          marginLeft: 46,
                          borderLeftWidth: 0,
                          borderTopWidth: 0,
                          borderRightWidth: 0,
                          borderBottomColor: "#e0e0e0",
                          alignItems: "flex-start",
                        },
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ tanggalAkhir: date });
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            onPress={this.handleSaveClick}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              borderRadius: 10,
              width: "100%",
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                textAlign: "center",

                color: "white",
                fontWeight: "bold",
              }}
            >
              Ajukan Izin
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AjukanIzin;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: "white",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  inputIOS: {
    fontSize: 14,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    marginTop: 5,
    marginRight: 10,
    justifyContent: "space-between",
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
  },
});
