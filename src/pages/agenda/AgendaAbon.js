import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { Header } from "react-native-elements";
import COLORS from "../../const/colors";
class AgendaAbon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null,
      startDate: null,
      endDate: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  handleSaveClick = async () => {
    if (this.state.startDate == "") {
      Alert.alert("Silahkan pilih tanggal..", ToastAndroid.SHORT);
      this.setState({
        isLoading: false,
      });
    } else {
      this.props.navigation.navigate("AjukanIzin");
    }
  };

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(2020, 1, 1); // Min date
    const maxDate = new Date(2050, 6, 3); // Max date
    this.state.startDate = selectedStartDate
      ? selectedStartDate.format("YYYY-MM-DD")
      : "";
    this.state.endDate = selectedEndDate
      ? selectedEndDate.format("YYYY-MM-DD")
      : "";
    AsyncStorage.setItem("startDate", this.state.startDate);
    AsyncStorage.setItem("endDate", this.state.endDate);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Agenda</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            weekdays={[
              "Senin",
              "Selasa",
              "Rabu",
              "Kamis",
              "Jumat",
              "Sabtu",
              "Minggu",
            ]}
            months={[
              "Januari",
              "Febrauri",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ]}
            style={{ color: "#000" }}
            // previousTitle={<Icon name={'caret-left'} size={22} style={{color:'#00AEEF', textAlign:'center'}}/>}
            previousTitle="Sebelumnya"
            nextTitle="Berikutnya"
            todayBackgroundColor={COLORS.primary}
            selectedDayColor={COLORS.primary}
            selectedDayTextColor="#fff"
            scaleFactor={375}
            textStyle={{
              color: "black",
            }}
            onDateChange={this.onDateChange}
          />
          {/* onPress={() => {this.props.navigation.push('AjukanIzin')}} */}
          <TouchableOpacity
            onPress={this.handleSaveClick}
            style={{
              padding: 15,

              borderRadius: 10,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
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
      </SafeAreaView>
    );
  }
}

export default AgendaAbon;
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 5,
  },
});
