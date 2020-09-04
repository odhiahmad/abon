import React, { Component } from "react";
import {
    View,
    Text,ScrollView,RefreshControl,
    StyleSheet, TouchableOpacity
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export const onSignOut = () =>  AsyncStorage.clear();

class ProfileAbon extends Component {
  static navigationOptions = {
    header: null
}

constructor(props) {
  super(props)
  this.state={
    nama_asn: 'User',
    username: '0000000',
    jabatan: 'Jabatan',
    isError: false,
    refreshing: false,
    isLoading: true, 
    average:'',
    average_color:'',
    average_percent:'',
    jumlah_telat:'',
    jam_telat:'',
    pulang_cepat:'',
    durasi:[],
    pulang_cepat:''
  }
  AsyncStorage.getItem('nama_asn', (error, result) => {
    if (result) {
        this.setState({
          nama_asn: result
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
  AsyncStorage.getItem('jabatan', (error, result) => {
    if (result) {
        this.setState({
            jabatan: result
        });
    }
  });
}

componentDidMount() {
  this.feedData();
}

_onRefresh = () => {
  this.setState({refreshing: true,isError:false});
  this.feedData().then(() => {
    this.setState({refreshing: false});
  });
}

async feedData () {
  return fetch('http://abon.sumbarprov.go.id/rest_abon/api/biodata_pegawai?nip='+this.state.username,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.status === 'success'){
      this.setState({
        isLoading: false,
          durasi : responseJson.durasi,
          average_color: responseJson.durasi[0].average_color,
          average_percent: responseJson.durasi[0].average_percent,        
          average: responseJson.durasi[0].average,      
          jumlah_telat: responseJson.rekap[0].jumlah_telat,      
          jam_telat: responseJson.rekap[0].jam_telat,      
          pulang_cepat: responseJson.rekap[0].pulang_cepat
      }, function() {
        // do something with new state
      });
    } else {
      alert('Sesi anda telah habis, silahkan Logout dan Login kembali')
      this.setState({
        isLoading: false,
        refreshing: false,
      })
    }
  })
  .catch((error) => {
    // console.error(error);
    this.setState({
      isLoading: false,
      isError: true
    })
  });
}

render() {
    return (
      <View style={styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          <LinearGradient
            colors={['#00DDFA', '#00B9F2']} style={styles.headerBanner}>
          </LinearGradient>
          <View style={styles.wrapper}>
            <View style={styles.boxHeader}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:23, fontWeight:'bold', marginBottom:3, color:'#2D3137'}}>{this.state.nama_asn}</Text>
                <Text style={{fontSize:12, fontWeight:'normal', marginBottom:3}}> {this.state.username}</Text>
                <Text style={{fontSize:12, fontWeight:'200', marginBottom:5, fontStyle:'italic'}}>{this.state.jabatan}</Text>
                <TouchableOpacity style={{borderWidth:1, borderColor:'#FF6063', padding:5,borderRadius:3,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                      <Icon name={'book'} size={15} style={{color:'#FF565E', textAlign:'center', padding:3}} />
                      <Text style={{color: '#FF565E', fontWeight:'bold', paddingHorizontal:3, paddingVertical:3,fontSize:14}}>Panduan</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxProgress}>
              <Text style={{marginBottom:10, fontSize:18, fontWeight:'bold', color:'#2D3137', marginBottom:20}}>Rata-rata Bulan ini</Text>
              <ProgressCircle
                  percent={this.state.average_percent}
                  radius={60}
                  borderWidth={8}
                  color={this.state.average_color}
                  shadowColor="#f4f4f4"
                  bgColor="#fff">
                <View style={{flexDirection:'column', alignItems:'center'}}>
                  <Text style={{ fontSize: 25 }}>{this.state.average}</Text>
                  <Text style={{ fontSize: 13 }}>Jam</Text>
                </View>
              </ProgressCircle>
              <View style={{marginTop:10, flexDirection: 'row'}}>
                <View style={{flexDirection:'column', marginRight: 10, alignItems:'center', justifyContent:'center'}}>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    <Text style={{fontWeight:'bold'}}>Terlambat : </Text>
                    <Text>{this.state.jumlah_telat} kali ({this.state.jam_telat})</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight:'bold'}}>Pulang Cepat : </Text>
                    <Text>{this.state.pulang_cepat}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{alignItems:'center'}}>
            <LinearGradient colors={['#00AEEF', '#00B9F2']} style={{borderRadius:10, width: 100}} style={styles.floatButton}>
              <TouchableOpacity style={{paddingHorizontal:40,paddingVertical: 15}} onPress={() => onSignOut().then(() => this.props.navigation.navigate("Auth"))}>  
                <Text style={{color:'#fff', fontWeight:'bold'}}>Log Out</Text>
              </TouchableOpacity>
            </LinearGradient>
        </View>
      </View>
    );
}
}
export default ProfileAbon;

const styles = StyleSheet.create({
container: {
    flex: 1,
},
headerBanner: {
    height: 170,
    width: '100%',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius:90,
},
wrapper: {
  paddingHorizontal: 20
},
boxHeader: {
  elevation: 1,
  backgroundColor: '#fff',
  shadowOffset:{  width: 2,  height: 2,  },
  shadowColor: '#e0e0e0',
  shadowOpacity: 1.0,
  paddingHorizontal: 10,
  paddingVertical: 10,
  marginTop: -60,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'center'
},
boxProgress: {
  elevation: 1,
  backgroundColor: '#fff',
  shadowOffset:{  width: 2,  height: 2,  },
  shadowColor: '#e0e0e0',
  shadowOpacity: 1.0,
  paddingHorizontal: 10,
  paddingVertical: 20,
  marginTop: 15,
  borderRadius: 10,
  alignItems: 'center',
  borderWidth: 1,
  borderColor:'#e0e0e0'
},
floatButton :{
  borderRadius: 30,
  backgroundColor: '#ee6e73',
  position: 'absolute',
  bottom: 10,
  alignItems:'center'
}
});