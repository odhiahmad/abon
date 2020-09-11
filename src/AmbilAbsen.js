import React, { Component } from "react";
import {
    View,
    Text,Alert,
    StyleSheet,TouchableOpacity,ActivityIndicator
} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconB from 'react-native-vector-icons/MaterialIcons';

class AmbilAbsen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locationResult: null,
      distance: null,
      isLoading: true,
      showAlert: false,
      opd:'',
      username:'',
      locationStatus: null,
      distance_max: null,
      value:null,
      id_koordinat:null,
      qrcode:null

    }
    AsyncStorage.getItem('opd', (error, result) => {
        if (result) {
            this.setState({
                opd: result
            });
        }
      });
      AsyncStorage.getItem('username', (error, result) => {
        if (result) {
            this.setState({
                username: result
            });
        }
      });
  }
    
  componentDidMount() {
    this._getLocationAsync();
  }
    
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
    
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  tap_absen_in = async () => {
    this.setState({
      isLoading: true
    })
    let location = await Location.getCurrentPositionAsync({});
    let details = {
      nip: this.state.username,
      id_koordinat: this.state.id_koordinat,
      lattitude: location.coords.latitude,
      longitude: location.coords.longitude,
      store_device_id: '-',
      device_model: '-',
      device_device: '-',
      device_hardware: '-',
      metode: this.state.qrcode
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join('&');  
    fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_metode', {
      headers: {                
        'Content-Type': 'application/x-www-form-urlencoded'
      }, body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.reset(responseJson.time, responseJson.date, responseJson.catatan);
    })
    .catch((error) => {
      console.error(error);
      alert('Anda sedang tidak terhubung ke jaringan internet')
    });
  }  

  tap_absen_out = async () => {
    this.setState({
      isLoading: true
    })
     let location = await Location.getCurrentPositionAsync({});
    let details = {
      nip: this.state.username,
      id_koordinat: this.state.id_koordinat,
      lattitude: location.coords.latitude,
      longitude: location.coords.longitude,
      store_device_id: '-',
      device_model: '-',
      device_device: '-',
      device_hardware: '-',
      metode: this.state.qrcode
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join('&');  
    fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_metode', {
      headers: {                
        'Content-Type': 'application/x-www-form-urlencoded'
      }, body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.reset(responseJson.time, responseJson.date, responseJson.catatan);
    })
    .catch((error) => {
      console.error(error);
      alert('Anda sedang tidak terhubung ke jaringan internet')
    });
  }  

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({
      locationStatus: status
    })
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        isLoading: false
      });
    }else{
      let location = await Location.getCurrentPositionAsync({});
      let details = {
        nip: this.state.username,
        opd: this.state.opd,
        lat: location.coords.latitude,
        long: location.coords.longitude
      };
        console.log("uname "+this.state.username);
        console.log("opd "+ this.state.opd);
        
        console.log("lat " +location.coords.latitude);
        console.log("long "+location.coords.longitude);
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join('&');  
        fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_distance', {
          method: 'POST',
          headers: {                
            'Content-Type': 'application/x-www-form-urlencoded'
          }, body: formBody
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 'success') {
            this.setState({
              distance: responseJson.data[0].distance,
              isLoading: false,
              lat:location.coords.latitude,
              long:location.coords.longitude,
              distance_max: responseJson.data[0].distance_max,
              qrcode: responseJson.data[0].qrcode,
              id_koordinat: responseJson.data[0].id_koordinat,
              value: responseJson.data[0].value
          })
          console.log("distance "+this.state.distance);
        console.log("value "+ this.state.value);
        console.log("qrcode "+this.state.qrcode);
        console.log("id_koordinat "+ this.state.id_koordinat);
          } else {
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Anda sedang tidak terhubung ke jaringan internet')
        });

      this.setState({ 
        locationResult: JSON.stringify(location),
        lat: location.coords.latitude,
        long: location.coords.longitude
      });
    }
  };

  reset(time,date){
    
    this.props.navigation.navigate('SuccessAbsen', { jam:time , tanggal:date });
    this.props.navigation.dispatch(resetAction);
  }
    
  render(){
    const {navigate} = this.props.navigation;

    if (this.state.locationStatus !== 'granted') {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center',paddingHorizontal:20}}>
          <IconB name="location-off" size={50} style={{color:'#00AEEF',marginBottom:20}} />
          <Text style={{textAlign:'center'}}>Kami mendeteksi anda tidak mengaktifkan GPS atau tidak memberikan akses lokasi terhadap aplikasi ini</Text>
        </View>
      );
    }
  
    if (this.state.isLoading) {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator
            style={styles.indicator}
            animating={true}
            size="large"
          />
        </View>
      );
    }
  
    return(
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.boxItemBlue}>
            <Text style={styles.textBold}>Absen di Kantor</Text>
            <Text style={{fontWeight:'200',color:'#fff', fontSize:16}}>(Pastikan anda berada di dalam lingkungan kantor)</Text>
            <View>
              {
                this.state.value == '0' ? (
                  <View>
                    <Text style={{color:'#fff', fontSize:15, textAlign:'center',marginTop:10}}>Anda berada diluar radius area kantor, Jarak anda {this.state.distance} m</Text>
                    <TouchableOpacity onPress={this._getLocationAsync}>
                      <View style={{
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 5,
                        marginTop: 15,
                        padding: 10,
                        alignItems:'center',
                        flexDirection: 'row',
                        justifyContent:'center'
                      }}>
                        <IconB name="autorenew" size={20} style={{color:'#fff'}} />
                        <Text style={{color:'#fff', fontSize:15}}>Cek Ulang GPS</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) :
                (
                  <TouchableOpacity onPress={this.state.absen_type === 1 ? this.tap_absen_in : this.tap_absen_out}>
                    <View style={{
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 5,
                      marginTop: 15,
                      padding: 10,
                      alignItems:'center',
                      flexDirection:'row',
                      justifyContent:'center'
                    }}>
                      <Icon name="fingerprint" size={20} style={{color:'#fff'}} />
                      <Text style={{color:'#fff', fontSize:15}}> Ambil Absen {this.state.absen_type === 1 ? 'Masuk' : 'Keluar'}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
            <TouchableOpacity onPress={() => navigate("TakePhoto",{absen_type: this.state.absen_type, lat: this.state.lat, long: this.state.long})} style={styles.boxItemRed}>
              <Text style={styles.textBold}>Absen di Luar Kantor</Text>
              <Text style={{fontWeight:'200',color:'#fff', fontSize:16}}>(Absen di luar kantor dengan mengupload bukti foto selfie atau dokumen pendukung)</Text>
            </TouchableOpacity>
        </View>                   
      </View>
    );
  }
}

export default AmbilAbsen;
const styles= StyleSheet.create({
    container: {
        flex: 1
      },
      boxItemBlue: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        elevation: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        backgroundColor: '#00AEEF'
      },
      boxItemRed: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        elevation: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#FF4955'
      },
      textBold: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 25
      }
    });