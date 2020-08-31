import React, { Component } from "react";
import {
    View,Picker,
    Text,FlatList,ActivityIndicator,
    StyleSheet, TouchableOpacity
} from "react-native";

import moment from 'moment';
require('moment/locale/id.js');
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import YearMonthPicker from './components/yearMonthPicker';


class RiwayatIzin extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'uname',
          isError: false,
          refreshing: false,
          isLoading: true,
          startYear: 2020,
          endYear: 2050,
          currentDay:null,
          data:[]
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
      showPicker = ()=> {
        const { startYear, endYear, selectedYear, selectedMonth } = this.state;
        this.picker
            .show({startYear, endYear, selectedYear, selectedMonth})
            .then(({year, month}) => {
              this.setState({
                selectedYear: year,
                selectedMonth: month
              })
            })
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
      feedData = async () => {
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
      const {selectedYear, selectedMonth} = this.state;
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
          <View style={styles.container}>
          {/* header */}
              {/* <View style={styles.wrapperHeader}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  
                  <Icon name="angle-left" size={30} style={{color:'#00AEEF'}} />
                  </TouchableOpacity>            
                  <Text style={{color: '#000', fontWeight:'bold',fontSize:20, marginLeft:10}}>Riwayat Izin</Text>
              </View> */}
            <View style={{flexDirection:'row', marginTop:10,marginVertical:5,marginHorizontal:5,
                    borderColor:'grey', color:'black',justifyContent:'space-between', marginRight:10}}>
                <Text style={{color: '#000',fontSize:18, marginLeft:10, padding:10}}>Agustus 2020</Text>
                <View style={{flexDirection:'row', marginVertical:5,marginHorizontal:5,borderColor:'grey', color:'black',justifyContent:'space-between', marginRight:10}}>
                    <TouchableOpacity onPress={this.feedData}  style={{
                            flexDirection:'column',
                            alignItems:'center',
                            marginRight:10,
                            justifyContent:'center' }}>
                        <View style={{  
                            backgroundColor: '#00AEEF',
                            borderWidth:1,  borderColor:'#00AEEF',
                            borderRadius: 2,                  
                            justifyContent:'center'}} >
                            <Text style={{color: 'white',marginHorizontal:5,marginVertical:5,fontWeight:'bold',fontSize:16}}>Semua Izin</Text>
                        </View>                
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={this.showPicker}  style={{
                            flexDirection:'column',
                            alignItems:'center',
                            marginRight:10,
                            justifyContent:'center'}}>
                      <View style={{  
                              backgroundColor: 'white',
                              borderWidth:1,  borderColor:'#00AEEF',
                              borderRadius: 2,                  
                              justifyContent:'center'}}>
                          <Text style={{color: '#00AEEF',marginHorizontal:5,marginVertical:5,fontWeight:'bold',fontSize:16}}>Per Bulan</Text>
                      </View>                
                    </TouchableOpacity>
                   
                </View>
                
            </View>   
            <Text style={styles.yearMonthText}>{selectedYear}-{selectedMonth}</Text>
                    <YearMonthPicker
                      ref={(picker) => this.picker=picker}
                    />                      
                {/* list riwayat */}
            <View style={styles.wrapper}>
                {
                  this.state.data.length == 0 ?
                  (
                    <View style={{padding:10}}>
                      <EmptyState />
                    </View>
                  ) :                
                  <FlatList
                      data={this.state.data}
                      keyExtractor={item => item.tanggal}
                      renderItem={({ item }) => (
                      <View style={styles.boxItem}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{paddingVertical:5, fontSize:16}}>{moment(item.date).format("dddd, DD MMMM YYYY ")}</Text>
                            <View style={styles.wrapper}>
                                    {
                                    item.status  === '1' 
                                    ?   <Text style={{fontSize:16, color:'blue', fontWeight:'bold'}}>ACC</Text>                                   
                                    :   <Text style={{fontSize:16, color:'red', fontWeight:'bold' }}> Pending</Text>           
                                    }
                                
                            </View>
                        </View>                  
                      <View style={{flexDirection:'row', alignItems:'center'}}/>
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
                  )}/>
                }
            </View>
          </View>
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
      },
      wrapper : {
        paddingHorizontal: 10
      },
      textHeader: {
        fontSize:25,
        fontWeight: 'bold',
        color:'#2D3137',
        marginTop:10,
        marginBottom:5
      },
      showPickerBtn: {
        height: 144,
        backgroundColor: '#973BC2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 6,
      },
      yearMonthText: {
        fontSize: 20,
        marginTop: 12
      },
      boxItem: {
        backgroundColor: '#F8F9FA',
        padding: 10,
        borderRadius: 14,
        marginBottom: 5,
        margin:10,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        elevation:1,
        flexDirection: 'column',
        justifyContent:'space-between'
      }
});