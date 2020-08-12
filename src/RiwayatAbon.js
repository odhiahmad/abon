import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Button, Image, ScrollView, TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

class RiwayatAbon extends Component {
    render(){
        return(
            <View style={styles.container}>
                 <View style={{flexDirection:'row', marginTop:50,
                            borderColor:'grey', color:'black', marginHorizontal:20, marginVertical:20,
                             justifyContent: 'space-between' }}>
                
                    <Text style={{color: '#000', fontWeight:'bold',fontSize:22}}>Riwayat Absen</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.push('Riwayat')}}  style={{
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                        <View style={{
                            width: 20,
                            height: 20,                           
                            justifyContent:'center'
                        }} >
                        <Icon name={'calendar-o'} size={20} style={{color:'#00AEEF', textAlign:'center'}} />
                        
                        </View>                
                    </TouchableOpacity>                   
                </View>
                
                <View style={{
                    height: 50, marginHorizontal:20, marginVertical:20,
                }}>
                    <Text style={{fontSize:15, fontWeight:"bold"}}>Agustus - 2020</Text>
                    <View style={{flexDirection:'row', width: 330, height:100, marginTop:20,
                                  backgroundColor: '#EFEFEF', marginTop:5,justifyContent:'space-between',
                                  borderColor:'grey', color:'black', borderRadius:5, margin:3 }}></View>
                    <View style={{flexDirection:'row', width: 330, height:100, marginTop:40,
                                  backgroundColor: '#EFEFEF', marginTop:5,justifyContent:'space-between',
                                  borderColor:'grey', color:'black', borderRadius:5, margin:3 }}></View>
                     <View style={{flexDirection:'row', width: 330, height:100, marginTop:40,
                                  backgroundColor: '#EFEFEF', marginTop:5,justifyContent:'space-between',
                                  borderColor:'grey', color:'black', borderRadius:5, margin:3 }}></View>
                     <View style={{flexDirection:'row', width: 330, height:100, marginTop:40,
                                  backgroundColor: '#EFEFEF', marginTop:5,justifyContent:'space-between',
                                  borderColor:'grey', color:'black', borderRadius:5, margin:3 }}></View>
                     <View style={{flexDirection:'row', width: 330, height:100, marginTop:40,
                                  backgroundColor: '#EFEFEF', marginTop:5,justifyContent:'space-between',
                                  borderColor:'grey', color:'black', borderRadius:5, margin:3 }}></View>
                </View>
                
                       
               
            
            </View>
        );
    }
}
export default RiwayatAbon;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    }
});