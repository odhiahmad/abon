import React, { Component } from "react";
import {
    View, Platform,FlatList,
    Text,ActivityIndicator,RefreshControl,
    StyleSheet, SafeAreaView,ScrollView, TouchableOpacity
} from "react-native";

import moment from 'moment';
require('moment/locale/id.js');
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import IconB from 'react-native-vector-icons/FontAwesome';

class RiwayatAbon extends Component {
    
    state = {
        isDateTimePickerVisible: false,
      };
      _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
      };
      constructor(props){
        super(props);
        this.state={
          isError: false,
          refreshing: false,
          isLoading: true,
          username:'uname',
          currentMonth:null,
          fullday:null,
          date:null
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
        this.getCurrentTime();
      }
      getCurrentTime = () =>
      {
        
        let year = new Date().getFullYear();
        var today = new Date();
        this.state.date=today.getFullYear()+'-0'+parseInt(today.getMonth()+1) ;
        this.state.fullday= this.state.currentMonth +' ' + today.getFullYear

        this.monthArray.map((item, keys) => {
          if (keys == new Date().getMonth()) {
            this.setState({ currentMonth: item + ' ' + year});
            
          }
        })
      }

      _onRefresh = () => {
        this.setState({refreshing: true,isError:false});
        this.feedData().then(() => {
          this.setState({refreshing: false});
        });
      }
    
      async feedData () {
        return fetch('http://abon.sumbarprov.go.id/rest_abon/api/list_absensi_past_month?nip=zahra_maulidna&date=2020-08',{
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
        const {navigate} = this.props.navigation;

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
         
                {/* refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                } */}
              <View style={styles.wrapperHeader}>
                    <Text style={styles.textHeader}>Riwayat Absen</Text>
                    <TouchableOpacity onPress={this._showDateTimePicker}  style={{
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                        <View style={{
                            width: 20,
                            height: 20,                           
                            justifyContent:'center'
                        }} >
                        <IconB name={'calendar-o'} size={20} style={{color:'#00AEEF', textAlign:'center'}} />
                        
                        </View>                
                    </TouchableOpacity>  
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                
                    />        
              </View>
              <Text style={{fontSize:17, paddingHorizontal: 20, paddingVertical:10,fontWeight: 'bold'}}>{this.state.currentMonth}</Text>
              <View style={styles.wrapper}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <View style={styles.boxItem}>
                      <View>
                        <Text style={{paddingVertical:5, fontSize:16}}>{moment(item.date).format("dddd, DD MMMM YYYY ")}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Icon name="corner-up-right" size={16} style={{color:'#1095E8'}} />
                          <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{item.tap_in} di {item.absen_in_loc}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Icon name="corner-up-left" size={16} style={{color:'#FF7A74'}} />                        
                          {
                            item.tap_out  === '' 
                            ?  <Text style={{fontSize:30, color:'blue', fontWeight:'bold'}}>-</Text>                                   
                            :  <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{item.tap_out} di {item.absen_out_loc}</Text>
                          }
                         </View>
                      </View>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                          {
                            item.duration  === '' 
                            ?   <Text style={{fontSize:30, color:'blue', fontWeight:'bold'}}>-</Text>                                   
                            :  <View style={{flexDirection:'row', alignItems:'center'}}>
                                      <Text style={{fontSize:30, color:'#1095E8',fontWeight:'bold' }}>{item.duration}</Text>    
                                      <Text style={{fontSize:14}}> Jam</Text>
                                </View>                
                          }
                       
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.date}
                />
              </View>
              
          </SafeAreaView>
        );
    }
}
export default RiwayatAbon;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapperHeader : {
      paddingHorizontal: 15,
      marginTop: 20,flexDirection:'row',marginHorizontal:5, marginVertical:5,justifyContent: 'space-between' 
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
      borderRadius: 10,
      marginBottom: 5,
      shadowOffset:{  width: 2,  height: 2,  },
      shadowColor: '#e0e0e0',
      shadowOpacity: 1.0,
      elevation:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between'
    }
});