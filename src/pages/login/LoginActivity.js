import React, { useContext, useEffect, useState, useReducer } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { validateAll } from "indicative/validator";
import { AuthContext } from "../../utils/authContext";
import COLORS from "./../../const/colors";
import { login } from "./../../services/login";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import LoaderModal from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import * as Device from "expo-device";

const LoginActivity = ({}) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    device_name: Device.modelName,
    device_id: "",
    device_device: Device.brand,
    device_hardware: Device.manufacturer,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    loading: false,
  });

  const { colors } = useTheme();

  const { signIn } = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async (userName, password) => {
    if (userName == "" || password == "") {
      Alert.alert("Masukan username dan password terlebih dahulu");
    }
    setData({
      ...data,
      loading: true,
      device_id:
        userName + data.device_name + data.device_device + data.device_hardware,
    });

    const dataForm = new FormData();
    dataForm.append("username", userName);
    dataForm.append("password", password);
    dataForm.append(
      "device_id",
      userName + data.device_name + data.device_device + data.device_hardware
    );
    dataForm.append("device_model", data.device_name);
    dataForm.append("device_hardware", data.device_hardware);
    dataForm.append("token_firebase", "tesiphone");
    const response = await login(dataForm);
    if (response.data.status === "RC200") {
      AsyncStorage.setItem("username", userName);

      AsyncStorage.setItem("gg", userName);
      AsyncStorage.setItem(
        "device_id",
        userName + data.device_name + data.device_device + data.device_hardware
      );
      AsyncStorage.setItem("device_model", data.device_name);
      AsyncStorage.setItem("device_device", data.device_device);
      AsyncStorage.setItem("device_hardware", data.device_hardware);

      console.log(response.data);
      let masuk = true;
      let token = userName;
      signIn({ masuk, token });
    } else if (response.data.status === "RC202") {
      Alert.alert("Username atau password salah");
    }

    setData({
      ...data,
      loading: false,
    });

    // return fetch(_baseURL_ + "login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: formBody,
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.response == 1) {
    //       AsyncStorage.setItem("pegawai", json.result[0].pegawai);
    //       AsyncStorage.setItem("token", json.result[0].pegawai);
    //       AsyncStorage.setItem("username", json.result[0].username);
    //       AsyncStorage.setItem("nama_asn", json.result[0].nama_asn);
    //       AsyncStorage.setItem("opd", json.result[0].opd);
    //       AsyncStorage.setItem("nm_opd", json.result[0].nm_opd);
    //       AsyncStorage.setItem("sub_opd", json.result[0].sub_opd);
    //       AsyncStorage.setItem("nm_sub_opd", json.result[0].nm_sub_opd);
    //       AsyncStorage.setItem("jabatan", json.result[0].jabatan);
    //       AsyncStorage.setItem("nip", json.result[0].nip);
    //       AsyncStorage.setItem("id_eselon", json.result[0].id_eselon);
    //       AsyncStorage.setItem("eselon", json.result[0].eselon);
    //       AsyncStorage.setItem("pangkat", json.result[0].pangkat);
    //       AsyncStorage.setItem("jenjang", json.result[0].jenjang);

    //       AsyncStorage.setItem(
    //         "store_device_id",
    //         userName +
    //           data.device_name +
    //           data.device_device +
    //           data.device_hardware
    //       );

    // let masuk = true;
    // let token = json.result[0].pegawai;
    //       console.log(json.result[0]);

    //       signIn({ masuk, token });

    //       setData({
    //         ...data,
    //         loading: false,
    //       });
    //     } else {
    //       alert(json.message);
    //       setData({
    //         ...data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     setData({
    //       ...data,
    //       loading: false,
    //     });
    //     console.error(error);
    //     alert("Anda sedang tidak terhubung ke jaringan internet");
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoaderModal loading={data.loading} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.white,
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Image
            style={{ width: 120, height: 120 }}
            source={require("../../../assets/icon.png")}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Username
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 5 }}></Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LoginActivity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  footer: {
    backgroundColor: "#7868e6",
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
  },
  signIn: {
    backgroundColor: COLORS.bottomTab,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
