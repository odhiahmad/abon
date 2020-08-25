import React, { Component } from "react";
import {
    View,
    Text,Alert,ScrollView,Button,
    StyleSheet, TouchableOpacity
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

export const onSignOut = () =>  AsyncStorage.clear();

class ProfileAbon extends Component {
  constructor(props) {
    super(props)
    this.state={
      nama_asn: 'User',
      username: '0000000',
      jabatan: 'Jabatan',
      isError: false,
      refreshing: false,
      isLoading: true,
      data: []
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
  
    render(){
        return(         
            <View style={styles.container}>
             <ScrollView>
            <LinearGradient
                colors={['#00AEEF', '#00B9F2']} style={styles.headerBanner}>
              </LinearGradient>
              <View style={styles.wrapper}>
                <View style={styles.boxHeader}>
                  <View style={{alignItems:'center'}}>
                  
                  <Text style={{fontSize:20, fontWeight:'bold', marginBottom:3, color:'#2D3137'}}>{this.state.nama_asn}</Text>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:3, color:'#2D3137'}}>{this.state.username}</Text>
                    <Text style={{fontSize:12, fontWeight:'normal', marginBottom:3}}>{this.state.jabatan}</Text>
                    <Text style={{fontSize:12, fontWeight:'200', marginBottom:5, fontStyle:'italic'}}></Text>
                    <TouchableOpacity style={{borderWidth:1, borderColor:'#FF6063', padding:5,borderRadius:3,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                        <Icon name={'book'} size={15} style={{color:'#FF565E', textAlign:'center', padding:3}} />
                        <Text style={{color: '#FF565E', fontWeight:'bold', paddingHorizontal:3, paddingVertical:3,fontSize:14}}>Panduan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.boxProgress}>
                    <Text style={{marginBottom:10, fontSize:18, fontWeight:'bold', color:'#2D3137', marginBottom:20}}>Rata-rata Bulan ini</Text>
                    <ProgressCircle
                      percent='100%'
                      radius={60}
                      borderWidth={8}
                      color='#fff'
                      shadowColor="#f4f4f4"
                      bgColor="#fff">
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                      <Text style={{ fontSize: 25 }}>{}</Text>
                      <Text style={{ fontSize: 13 }}>Jam</Text>
                    </View>
                  </ProgressCircle> 
                  <View style={{marginTop:10, flexDirection: 'row'}}>
                    <View style={{flexDirection:'column', marginRight: 10, alignItems:'center', justifyContent:'center'}}>
                      <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <Text style={{fontWeight:'bold'}}>Terlambat : </Text>
                        <Text>{}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight:'bold'}}>Pulang Cepat : </Text>
                        <Text>{}</Text>
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
const styles= StyleSheet.create({
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
  borderRadius: 10,
  backgroundColor: '#ee6e73',
  position: 'absolute',
  bottom: 10,
  alignItems:'center'
}
});