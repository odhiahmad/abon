import React, { Component} from "react";
import {
    View, FlatList,Dimensions,
    Text,ActivityIndicator,RefreshControl,
    StyleSheet, SafeAreaView,ScrollView, TouchableOpacity
} from "react-native";

const Screen = Dimensions.get('window');
import moment from 'moment';
require('moment/locale/id.js');
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import YearMonthPicker from './components/yearMonthPicker';
import IconB from 'react-native-vector-icons/FontAwesome';
import EmptyState from './components/EmptyState';

class RiwayatAbon extends Component {
  constructor(props){
    super(props);
    
    this.state={
      isError: false,
      refreshing: false,
      isLoading: true,
      username: '',
      startYear: 2020,
      endYear: 2050,
      date:null, 
      currentMonth: null,
      currentTime:null,
      data:[]
    }
    AsyncStorage.getItem('username').then((username) => {
      if(username){
          this.setState({username: username});
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
            selectedMonth: month,
            
          })
          
          this.getCurrentTime();
          this.feedData();
        })            
  }
    
  componentDidMount() {
      this.feedData();        
      this.timer = setInterval(() =>
      {
          this.getCurrentTime();
      }, 1000);
  }

  getCurrentTime = () =>
  {        
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear();
    const {selectedMonth} = this.state;
      this.monthArray.map((item, keys) => {
        if (keys == selectedMonth-1) {
          this.setState({ bulan: item  });
        }
      })    
      this.setState({ currentMonth: year + '-0' + month });    
  }

  feedData=()=>{ 
    this.setState({
        isLoading:false
    })     
    const {selectedYear, selectedMonth} = this.state;   
    if (selectedYear == null){     
      console.log(this.state.username); 
      fetch('http://abon.sumbarprov.go.id/rest_abon/api/list_absensi_past_month?nip='+this.state.username+'&date='+this.state.currentMonth,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response)=> response.json())
      .then((json)=> {
        if (json.status === 'success'){
          this.setState({
            isLoading: false,
            data: json.harian,
          }, function() {
          });
        } else {
          this.setState({
            isLoading: false,
            refreshing: false,
          })
        } 
      })
      .catch((error)=>{
          console.error(error);
      });
    }
    else{
      fetch('http://abon.sumbarprov.go.id/rest_abon/api/list_absensi_past_month?nip='+this.state.username+'&date='+selectedYear+'-0'+selectedMonth,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then((response)=> response.json())
      .then((json)=> {
        if (json.status === 'success'){
          this.setState({
            isLoading: false,
            data: json.harian,
          }, function() {
          });
        } else {
          this.setState({
            isLoading: false,
            refreshing: false,
          })
        } 
      })
      .catch((error)=>{
          console.error(error);
      });
    }
  }
     
  render(){    
    const {selectedYear} = this.state;   
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
        <View style={styles.wrapperHeader}>
            <Text style={styles.textHeader}>Riwayat Absen</Text>
            <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{this.state.currentMonth}</Text>
            <TouchableOpacity onPress={this.showPicker}  style={{
                    flexDirection:'column',
                    alignItems:'center',
                    marginRight:10,
                    justifyContent:'center'}}>
              <View style={{  
                      backgroundColor: 'white',
                      borderColor:'#00AEEF',
                      borderRadius: 2,                  
                      justifyContent:'center'}}>
                    <IconB name={'calendar-o'} size={20} style={{color:'#00AEEF', textAlign:'center'}} />
              </View>                
            </TouchableOpacity>   
        </View>
                                
        <Text style={styles.yearMonthText}>{this.state.bulan} {selectedYear}</Text>

        <View style={styles.wrapper}>                  
          {                   
            this.state.data.length == 0 ?
            (
              <View>
                <EmptyState />
                
              </View>
            ) :
            (
              <View />
            )
          }
          
          <FlatList
            data={this.state.data}
            refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={this.feedData}/>}
            keyExtractor={item => item.date}
            renderItem={({ item }) => (
              <View style={styles.boxItem}>
                <View>                
                  <Text style={{paddingVertical:5, fontSize:16}}>{moment(item.date).format("dddd, DD MMMM YYYY ")}</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="corner-up-right" size={16} style={{color:'#1095E8'}} />
                    <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{item.tap_in} di {item.absen_in_loc}</Text>
                    
                  </View>
                  {
                      item.valid_in == 2 
                        ? <Text style={{fontSize:13, color:'red', marginLeft:20}}><Icon name="alert-triangle" size={15} style={{color:'red'}} /> Device Anda tidak sesuai</Text> 
                        : <View></View>
                  }
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="corner-up-left" size={16} style={{color:'#FF7A74'}} />                        
                    {
                      item.tap_out  === null
                      ?  <Text style={{fontSize:30, color:'black',paddingLeft:5}}>-</Text>                                   
                      :  <Text style={{paddingVertical:5, fontSize:15, color:'#2D3137',paddingLeft:5}}>{item.tap_out} di {item.absen_out_loc}</Text>
                    }
                    </View>
                    {
                  item.valid_out == 2 ? <Text style={{fontSize:13, color:'red', marginLeft:20}}><Icon name="alert-triangle" size={15} style={{color:'red'}} /> Device Anda tidak sesuai</Text> : <View />
                }
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {
                      item.duration  === null
                      ?  <View style={{flexDirection:'row', alignItems:'center',fontWeight:'bold'}}>
                            <Text style={{fontSize:35, color:'#1095E8',paddingLeft:5, fontWeight:'bold'}}>-</Text> 
                            <Text style={{fontSize:18}}> Jam</Text> 
                          </View>                                       
                      :  <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:35, color:'#1095E8',fontWeight:'bold' }}>{item.duration}</Text>    
                                <Text style={{fontSize:18}}> Jam</Text>
                          </View>                
                    }                       
                </View>                      
              </View>
            )}               
          />                
        </View>
        
        <YearMonthPicker
          ref={(picker) => this.picker=picker}/>  
            
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
    paddingHorizontal: 20,
    marginBottom:70
  },
  textHeader: {
    fontSize:25,
    fontWeight: 'bold',
    color:'#2D3137',
    marginTop:10,
    marginBottom:5
  },
  yearMonthText: {
    fontSize: 18,
    marginBottom:10,
    marginLeft:20
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