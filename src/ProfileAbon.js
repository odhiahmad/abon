import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/AntDesign';
class ProfileAbon extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={{  height : '20%',width : '100%', borderBottomStartRadius : 70,
                                backgroundColor : '#00AEEF',
                                borderBottomEndRadius : 70}}>
                          {/* Akun */}        
                          <View style={{
                                    flexDirection:'column',
                                    marginVertical:30,
                                    marginHorizontal:30,
                                    alignItems:'center',
                                    marginTop:100, borderWidth: 1, borderColor: '#d0d0d0',                    
                                    borderRadius:10,
                                    backgroundColor:'#fff'                    
                            }}>
                                        
                        <Text style={{ fontWeight:'bold', textAlign:"center", paddingVertical:5, paddingHorizontal:5,fontSize:22}}>Zahra Maulidna, S.Pd</Text>
                        <Text style={{ textAlign:"center", padding:5, fontSize:12}}>zahra_maulidna</Text>
                        <Text style={{ textAlign:"center", fontSize:12}}>Tenaga IT</Text>
                    
                        <View style={{ flexDirection:'row',width:90,height:40, borderColor:'grey', color:'black', marginBottom:60,
                                        paddingHorizontal:10, paddingVertical:10,marginTop:10,justifyContent:'center',
                                        borderWidth:1, borderColor: '#FF565E',borderRadius:5, }}>
                            <Icon name={'book'} size={15} style={{color:'#FF565E', textAlign:'center', padding:3}} />         
                            <Text style={{color: '#FF565E', fontWeight:'bold', paddingHorizontal:2, paddingVertical:2,fontSize:14}}>Panduan</Text>
                        </View> 
                                                
                    </View>
                      {/* Jam Kerja */}
                    <View style={{
                            flexDirection:'column',
                            marginVertical:30,
                            marginHorizontal:30,
                            alignItems:'center',
                            marginTop:10, borderWidth: 1, borderColor: '#d0d0d0',                    
                            borderRadius:10,
                            backgroundColor:'#fff'                    
                    }}>
                                
                        <Text style={{ fontWeight:'bold', textAlign:"center", paddingVertical:10, paddingHorizontal:10,fontSize:22}}>Rata-Rata Bulan ini: </Text>
                        <View style={styles.circle}>
                            <Text style={{ fontWeight:'bold', fontSize:22}}>7.9</Text>
                            <Text style={{ fontSize:17}}>jam</Text>
                        </View>   
                        <Text style={{ textAlign:"center", padding:10, fontSize:13}}>Terlambat: 3 kali (00 jam 56 menit)</Text>
                        <Text style={{ textAlign:"center", fontSize:13,marginBottom:10}}>Pulang Cepat : 0</Text>                                         
                    </View>
                      {/* Logout */}
                    <TouchableOpacity onPress={() => {this.props.navigation.push('Logout')}}  style={{
                                flexDirection:'column',
                                alignItems:'center', 
                                justifyContent:'center'
                    }}>
                        <View style={{
                            width:140,
                            paddingVertical:10,
                            paddingHorizontal:10,
                            height: 50,
                            borderWidth: 1,
                            borderColor:'#00AEEF',
                            backgroundColor:'#00AEEF',
                            justifyContent:'center',
                            borderRadius: 17
                        }} >
                            <Text style={{textAlign:'center',fontSize:15, color:'white', fontWeight:"bold"}}>Log Out</Text>
                        </View>                  
                    </TouchableOpacity>                      
                 </View>
            </View>
        );
    }
}
export default ProfileAbon;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },   
     circle: {
        width: 120,
        height: 120,
        flexDirection:"column",
        borderWidth: 6,
        borderRadius: 100,
        borderColor: '#00AEEF',
        justifyContent: 'center',
        alignItems: 'center'
      }
});