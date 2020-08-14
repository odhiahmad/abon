import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Button, Image, TouchableOpacity
} from "react-native";

import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

class RiwayatIzin extends Component {
    
    state = {
        isDateTimePickerVisible: false,
      };
      _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
      };

    render(){
        return(
            <View style={styles.container}>
                 <View style={{flexDirection:'row', marginTop:50,
                            borderColor:'grey', color:'black', marginHorizontal:20, marginVertical:20,
                             justifyContent: 'space-between' }}>
                
                    <Text style={{color: '#000', fontWeight:'bold',fontSize:22}}>Riwayat Absen</Text>
                    <View style={{flexDirection:'row', marginTop:10,marginVertical:5,marginHorizontal:5,
                            borderColor:'grey', color:'black', 
                             justifyContent: 'space-between' }}>
                
                        <TouchableOpacity onPress={this._showDateTimePicker}  style={{
                                flexDirection:'column',
                                alignItems:'center',
                                marginRight:20,
                                justifyContent:'center'
                            }}>
                            <View style={{
                                width: 25,
                                height: 25,      
                                borderWidth:1,  borderColor:'#00AEEF',
                                backgroundColor:'white',
                                borderRadius: 2,                  
                                justifyContent:'center'
                            }} >
                             <Text style={{color: '#00AEEF',marginHorizontal:2,marginVertical:1, fontWeight:'bold',fontSize:14}}>All</Text>
                            
                            </View>                
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={this._showDateTimePicker}  style={{
                            flexDirection:'column',
                           
                        }}>
                        <View style={{
                            width: 20,
                            height: 20,                           
                            justifyContent:'center'
                        }} >
                        <Icon name={'calendar-o'} size={20} style={{color:'#00AEEF', textAlign:'center'}} />
                        
                        </View>                
                    </TouchableOpacity>  
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}/> 
                        </View>                
                    </View>
                 <View style={{padding:6}}>
                            <Text style={{padding:6}}>Start:{this.state.isDateTimePickerVisible}</Text>
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
export default RiwayatIzin;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    }
});