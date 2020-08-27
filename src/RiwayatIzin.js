import React, { Component } from "react";
import {
    View,
    Text,FlatList,ActivityIndicator,
    StyleSheet,  SafeAreaView, TouchableOpacity
} from "react-native";

import moment from 'moment';
require('moment/locale/id.js');
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconB from 'react-native-vector-icons/Feather';

class RiwayatIzin extends Component {
    constructor(props){
        super(props);
        this.state={
          isError: false,
          refreshing: false,
          isLoading: true,
          username:'uname'
        }

        AsyncStorage.getItem('username', (error, result) => {
          if (result) {
              this.setState({
                username: result
              });
          }
        });
        this.monthArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus','September','Oktober','November','Desember'];
    
      }
      componentDidMount() {
        this.feedData();
      }
    // state = {
    //     isDateTimePickerVisible: false,
    //   };
    //   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
    //   _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    //   _handleDatePicked = (date) => {
    //     console.log('A date has been picked: ', date);
    //     this._hideDateTimePicker();
    //   };
      _onRefresh = () => {
        this.setState({refreshing: true,isError:false});
        this.feedData().then(() => {
          this.setState({refreshing: false});
        });
      }
      async feedData () {
        return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin_pegawai?nip='+this.state.username,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === 'success'){
            this.setState({
              isLoading: false,
              data: responseJson.harian,
            }, function() {
              // do something with new state
            });
          } else {
            alert(responseJson.harian)
            this.setState({
              isLoading: false,
              refreshing: false,
            })
          }  console.log(this.state.date);
        })
        
        .catch((error) => {
          // console.error(error);
          this.setState({
            isLoading: false,
            isError: true
          })
        });
      }
    render(){
        if (this.state.isLoading) {
            return (
                
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator
                  style={styles.indicator}
                  animating={true}
                  size="large"
                /> 
              </View>
              
            );
          }
          if (this.state.isError) {
            return (
              <ErrorState refresh={this._onRefresh} />
            );
          }  
        return(
            <SafeAreaView style={{backgroundColor:'#EFEFEF', flex:1}}>
                <View style={styles.container}>
                {/* title */}
                    <View style={styles.wrapperHeader}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={20} style={{color:'#2D3137'}} />
                        </TouchableOpacity>            
                        
                        <Text style={{color: '#000', fontWeight:'bold',fontSize:22}}>Riwayat Izin</Text>
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
                
                {/* list riwayat */}
                    <View style={styles.wrapper}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                            <View style={styles.boxItem}>
                             <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{paddingVertical:5, fontSize:16}}>{moment(item.date).format("dddd, DD MMMM YYYY ")}</Text>
                            <View style={styles.wrapper}>
                                    {
                                    item.status  === '1' 
                                    ?   <Text style={{fontSize:18, color:'blue'}}>ACC</Text>                                   
                                    :   <Text style={{fontSize:18, color:'red' }}> Pending</Text>           
                                    }
                                
                                </View>
                              </View>                  
                             <View style={{flexDirection:'row', alignItems:'center'}}>
                             </View>
                                <View>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                
                                    <Icon name="info-circle" size={16} style={{color:'#1095E8'}} />
                                    <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{item.izin} </Text>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                
                                <Icon name="list-alt"  size={16} style={{color:'#1095E8'}} />
                                <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5,paddingHorizontal:30}}>{item.perihal} </Text>
                            </View>
                               
                                </View>
                               
                            </View>
                            )}
                            keyExtractor={item => item.date}
                        />
                    </View>                      
                </View>
            </SafeAreaView>                    
        );
    }
}
export default RiwayatIzin;
const styles= StyleSheet.create({
    container: {
       flex:1
    },
    wrapperHeader : {
        flexDirection:'row',
        paddingHorizontal: 15,
        marginTop:10,
        borderColor:'grey', color:'black', 
        marginHorizontal:10, marginVertical:10,
        justifyContent: 'space-between'
      },
      wrapper : {
        paddingHorizontal: 20
      },
      textHeader: {
        fontSize:25,
        fontWeight: 'bold',
        color:'#2D3137',
        marginTop:10,
        marginBottom:5
      },
      boxItem: {
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 4,
        marginBottom: 5,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        elevation:1,
        flexDirection: 'column',
        justifyContent:'space-between'
      }
});