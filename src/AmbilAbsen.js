import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

class AmbilAbsen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={{
                    flexDirection:'column',
                    paddingVertical:10,
                    paddingHorizontal:10,
                    justifyContent: 'space-between',
                    marginVertical:20,
                    marginHorizontal:20,
                    backgroundColor:'#00AEEF',
                    borderRadius: 7}} >
                    <Text style={{fontSize:25, color:'white', marginTop:6,fontWeight:"bold"}}>Absen di Kantor</Text>
                    <Text style={{fontSize:16, color:'white', marginTop:5}}>(Pastikan anda berada di dalam lingkungan kantor)</Text>
                    <Text style={{fontSize:16, color:'white', textAlign:'center', margin:5, marginTop:5}}>Anda berada di radius area kantor : 15,08m dari titik tengah</Text>
                    <Text style={{fontSize:16, color:'white', textAlign:'center',marginTop:5}}>Silahkan Ambil Absen</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.push('dalamkantor')}}  style={{
                                flexDirection:'column'
                    }}>
                    <View style={{
                            flexDirection:'row',
                            paddingVertical:10,
                            paddingHorizontal:10,
                            borderWidth: 1,
                            marginTop:5,
                            marginBottom:10,
                            alignItems:'center',
                            justifyContent: 'space-between',
                            borderColor:'white',
                            justifyContent:'center',
                            borderRadius: 3
                        }} >
                         <Icon name={'check-square-o'} size={18} style={{ color:'#fff', padding:5}} />
                        <Text style={{fontSize:15, color:'white'}}>Ambil Absen</Text>
                    </View>    
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
                    <Text style={{fontSize:14, marginBottom:10, color:'white', marginTop:5}}>(Absen di luar kantor dengan mengupload bukti foto selfie atau dokumen pendukung)</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.push('luarkantor')}}  style={{
                                flexDirection:'column',
                               
                    }}>
                        <View style={{
                                flexDirection:'row',
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderWidth: 1,
                                marginTop:15,
                                marginBottom:10,
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
        flex: 1,
        backgroundColor:'white'
    },   
});
