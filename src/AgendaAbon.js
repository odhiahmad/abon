import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,  TouchableOpacity
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

class AgendaAbon extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //set value in state for start and end date
          selectedStartDate: null,
          selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }
    
      onDateChange(date, type) {
        //function to handle the date change 
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }

    render(){
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(2020, 1, 1); // Min date
        const maxDate = new Date(2050, 6, 3); // Max date
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return(
            <View style={{ flex:1, backgroundColor: 'white'
                }}> 
                {/* Agenda */}
                <View style={{flexDirection:'row', marginTop:50,
                            borderColor:'grey', color:'black', marginHorizontal:20, marginVertical:20,
                            borderRadius:5, justifyContent: 'space-between'}}>
                
                  <Text style={{color: '#000', fontWeight:'bold',fontSize:22}}>Agenda</Text>
                  <TouchableOpacity onPress={() => {this.props.navigation.push('RiwayatIzin')}}  style={{
                          flexDirection:'column',
                          alignItems:'center',
                          justifyContent:'center'
                      }}>
                      <View style={{
                          width: 20,
                          height: 20,
                          justifyContent:'center'
                      }} >
                      <Icon name={'list'} size={22} style={{color:'#00AEEF', textAlign:'center'}} />                    
                      </View>                    
                  </TouchableOpacity>
                </View>

               {/* Kalender */}
                  <CalendarPicker
                      startFromMonday={true}
                      allowRangeSelection={true}
                      minDate={minDate}
                      maxDate={maxDate}
                      weekdays={['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']}
                      months={[
                          'Januari',
                          'Febrauri',
                          'Maret',
                          'April',
                          'Mei',
                          'Juni',
                          'Juli',
                          'Agustus',
                          'September',
                          'Oktober',
                          'November',
                          'Desember',
                      ]}
                      style={{color: '#000'}}
                      previousTitle={<Icon name={'caret-left'} size={22} style={{color:'#00AEEF', textAlign:'center'}}/>}
                      nextTitle={<Icon name={'caret-right'} size={22} style={{color:'#00AEEF', textAlign:'center'}}/>}
                      
                      todayBackgroundColor="#00AEEF"
                      selectedDayColor="#74C6F4"
                      selectedDayTextColor="#fff"
                      scaleFactor={375}
                      textStyle={{
                          color: 'black',
                      }}
                      
                      onDateChange={this.onDateChange}
                      />
                         {/* Ajukan Izin */}
                         
                      <TouchableOpacity onPress={() => {this.props.navigation.push('AjukanIzin')}}  style={{
                              flexDirection:'column',
                              alignItems:'center',
                              justifyContent:'center', marginTop:20
                          }}>
                          <View style={{
                              paddingVertical:10,
                              paddingHorizontal:10,
                              height: 50,
                              borderWidth: 1,
                              borderColor:'#00AEEF',
                              backgroundColor:'#00AEEF',
                              justifyContent:'center',
                              borderRadius: 10
                          }} >
                          <Text style={{textAlign:'center',fontSize:15, color:'white', fontWeight:"bold"}}>Ajukan Izin</Text>
                          
                          </View>
                
                      </TouchableOpacity>
                        <View style={{padding:6}}>
                            <Text style={{padding:6}}>Start: {startDate}</Text>
                            <Text style={{padding:6}}>End : {endDate}</Text>
                        </View>
               
            </View>
            
        );
    }
}
export default AgendaAbon;
const styles= StyleSheet.create({

});