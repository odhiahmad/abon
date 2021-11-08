import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import * as Device from "expo-device";
import * as Permissions from "expo-permissions";
import Icon from "react-native-vector-icons/Feather";
import { StackActions } from "@react-navigation/native";
import { _baseURL_ } from "../../../constant";
import * as ImageManipulator from "expo-image-manipulator";
// import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
class TakePhoto extends Component {
  static navigationOptions = {
    title: "Ambil Foto Absen",
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: "",
    fileName: "",
    jenis_presensi: this.props.route.params.jenis_presensi,
    lat: this.props.route.params.lat,
    long: this.props.route.params.long,
    valueAlert: this.props.route.params.valueAlert,
    isLoading: false,
    loadingUpload: false,
  };

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  ambilFoto = () => {
    this.setState({ loadingUpload: true });
    // this.snap();
    setTimeout(() => {
      this.snap();
    }, 1000);
  };

  snap = async () => {
    if (this.camera) {
      const optionsCamera = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
      };
      let photo = await this.camera.takePictureAsync(optionsCamera);

      let resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: "jpeg", base64: true }
      );

      const username = await AsyncStorage.getItem("username");
      const device_id = await AsyncStorage.getItem("store_device_id");
      const device_model = await AsyncStorage.getItem("device_model");
      const device_device = await AsyncStorage.getItem("device_device");
      const device_hardware = await AsyncStorage.getItem("device_hardware");

      console.log("mulai upload");
      this.setState({ loading: true, uri: photo.uri });
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = resizedPhoto.uri;
      let filename = localUri.split("/").pop();
      console.log("Nama", filename);
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log("Tes base 64 :" + filename);

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
      dataForm.append("jenis_opsi", data.valueAlert);
      dataForm.append("package_name[0]", "tes");
    }
  };

  reset(time, date) {
    this.props.navigation.dispatch(
      StackActions.replace("SuccessAbsen", { jam: time, tanggal: date })
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            style={styles.indicator}
            animating={true}
            size="large"
          />
          <Text>Sedang Mengupload Photo</Text>
        </View>
      );
    }

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>No access to camera</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Camera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
            }}
            type={this.state.type}
          >
            {/* <View style={{
                            // position: 'absolute',
                            alignSelf: 'flex-end',
                            bottom: 40,
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            padding: 20,
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity
                                onPress={this.ambilFoto}
                                style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <View style={{ backgroundColor: 'green', borderRadius: 40 }}>
                                    <Icon name="camera" size={30} style={{ color: 'white', padding: 20 }} />

                                </View>
                            </TouchableOpacity>
                        </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.ambilFoto}
                style={{
                  alignSelf: "flex-end",
                  flex: 1,
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <View style={{ backgroundColor: "green", borderRadius: 40 }}>
                  <Icon
                    name="camera"
                    size={30}
                    style={{ color: "white", padding: 20 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </SafeAreaView>
      );
    }
  }
}

export default TakePhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
