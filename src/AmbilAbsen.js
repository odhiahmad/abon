import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,TouchableOpacity,ActivityIndicator
} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      distance_max: null
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
    let details = {
        'lat': this.state.lat,
        'long': this.state.long,            
        'nip': this.state.nip,
        'opd': this.state.opd,
    };
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join('&');
    fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_metode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }, body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.reset(responseJson.time, responseJson.date);
    })
    .catch((error) => {
      console.error(error);
      alert('Anda sedang absen in tidak terhubung ke jaringan internet')
    });
  }
    
    //   tap_absen_out = async () => {
    //     this.setState({
    //       isLoading: true
    //     })
    //     fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_metode', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: JSON.stringify({
    //         'lat': this.state.lat,
    //         'long': this.state.long,            
    //         'nip': this.state.nip,
    //         'opd': this.state.opd,
    //       }),
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       this.reset(responseJson.time, responseJson.date);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert('Anda sedang tidak terhubung ke jaringan internet')
    //     });
    //   }
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

        
          fetch('http://abon.sumbarprov.go.id/rest_abon/api/cek_distance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                'lat': location.coords.latitude,
                'long': location.coords.longitude
              }),
          })
          .then((response) => response.json())
          .then((json) => {
         
              })
          .catch((error) => {
            console.error(error);
            alert('Anda sedang location tidak terhubung ke jaringan internet')
          });
    
          this.setState({ 
            locationResult: JSON.stringify(location),
            lat: location.coords.latitude,
            long: location.coords.longitude
          });
        }
      };
    
      reset(time,date){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SuccessAbsen', params:{jam:time , tanggal:date} })],
        });
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
            <Text style={{fontWeight:'200',color:'#fff'}}>(Pastikan anda berada di dalam lingkungan kantor)</Text>
            <View>
              {
                this.state.distance > this.state.distance_max ? (
                  <View>
                    <Text style={{color:'#fff', fontSize:12, textAlign:'center',marginTop:10}}>Anda berada terlalu jauh dari kantor, Jarak anda {this.state.distance} m</Text>
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
                        <Icon name="autorenew" size={20} style={{color:'#fff'}} />
                        <Text style={{color:'#fff'}}>Cek Ulang GPS</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) :
                (
                  <TouchableOpacity onPress={this.state.absen_type === 1 ? this.tap_absen_in : this.tap_absen_in}>
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
                      <Text style={{color:'#fff'}}>Ambil Absen {this.state.absen_type === 1 ? 'Masuk' : 'Keluar'}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <TouchableOpacity onPress={() => navigate("TakePhoto",{absen_type: this.state.absen_type, lat: this.state.lat, long: this.state.long})} style={styles.boxItemRed}>
            <Text style={styles.textBold}>Absen di Luar Kantor</Text>
            <Text style={{fontWeight:'200',color:'#fff'}}>(Absen di luar kantor dengan mengupload bukti foto selfie atau dokumen pendukung)</Text>
          </TouchableOpacity>
        </View>   
                <View style={{
                    flexDirection:'column',
                    paddingVertical:10,
                    paddingHorizontal:10,
                    justifyContent: 'space-between',
                    marginVertical:20,
                    marginHorizontal:20,                  
                    backgroundColor:'#FF565E',
                    borderRadius: 7}} >
                    <Text style={{fontSize:25, color:'white', marginTop:10,fontWeight:"bold"}}>Absen di Luar Kantor</Text>
                    <Text style={{fontSize:14,  color:'white', marginTop:5}}>(Absen di luar kantor dengan mengupload bukti foto selfie atau dokumen pendukung)</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.push('luarkantor')}}  style={{
                                flexDirection:'column',
                               
                    }}>
                        <View style={{
                                flexDirection:'row',
                                paddingVertical:8,
                                paddingHorizontal:8,
                                borderWidth: 1,
                                marginTop:8,
                                marginBottom:8,
                                alignItems:'center',
                                justifyContent: 'space-between',
                                borderColor:'white',
                                justifyContent:'center',
                                borderRadius: 3
                            }} >
                            <Text style={{fontSize:15, color:'white'}}>Ambil Absen</Text>
                        </View>   
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
        fontSize: 23
      }
    });