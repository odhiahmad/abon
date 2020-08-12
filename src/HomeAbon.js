import React, { Component } from "react";
import {
    View,Platform ,
    Text,
    StyleSheet,TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

class HomeAbon extends Component {
    constructor() {
        super();
    
        this.state = { currentTime: null, currentDay: null, greetingMessage:null,currentMonth: null }
        this.daysArray = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        this.monthArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus','September','Oktober','November','Desember'];
      }
      componentDidMount() {
        this.timer = setInterval(() => {
          this.getCurrentTime();
        }, 1000);
      }
       
      componentWillUnmount() {
        clearInterval(this.timer);
      }
    
      // componentWillMount() {
      //   this.getCurrentTime();
      // }
   
      getCurrentTime = () => {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
    
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
  
        const greetingMessage =
              hour >= 4 && hour < 11 ? 
              'Selamat Pagi' :
              hour >= 11 && hour <= 15 ? 
              'Selamat Siang' :
              hour >= 15 && hour <= 18 ? 
              'Selamat Sore' :
              hour > 18 || hour < 4 ? 
              'Selamat Malam' :
              'Welcome'
              this.setState({greetingMessage});
        
        this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' });

        this.monthArray.map((item, keys) => {
          if (keys == new Date().getMonth()) {
            this.setState({ currentMonth: item  });
          }
        })
        
        this.daysArray.map((item, key) => {
          if (key == new Date().getDay()) {
            this.setState({ currentDay: item +', ' + date + ' ' +  this.state.currentMonth + ' ' + year });
          }
        })
      }
    render(){
        return(
          
            <View style={styles.container}>
                <View style={{flexDirection:'row', width: 280,
                            borderColor:'grey', color:'black',
                            marginTop:50, marginLeft:20,marginBottom:20,
                            alignItems:'center', borderRadius:5, margin:4
                }}>
            
                <Text style={{color: '#000', fontWeight:'bold',  paddingVertical:10,
                        paddingHorizontal:10,fontSize:24}}>{this.state.greetingMessage}, Zahra Maulidna, S.Pd</Text>
                </View>
                 {/* Absen */}
                <View style ={{
                     paddingHorizontal :20
                 }}>
                    <View style={{
                        flexDirection:'row',
                        paddingVertical:10,
                        paddingHorizontal:10,
                        backgroundColor:'#fff', justifyContent:'center',
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10
                    }}>
                        <View style={{
                            padding:10
                        }}>
                        <Text style={styles.timeText}>{this.state.currentTime}</Text>
                        <Text style={styles.daysText}>{this.state.currentDay}</Text>
                            
                            <View style={{
                                justifyContent: 'space-between',
                                marginTop:20,
                                borderWidth: 1,
                                borderColor: '#d0d0d0',
                                borderRadius: 1
                                }} >

                            </View>
                            <View style={{
                                textAlign:'center',
                                flexDirection:'row',
                                paddingHorizontal:10,
                                paddingTop:20,
                                justifyContent:'space-around'
                            }}>
                                <View style={{
                                   alignItems:'center',
                                   textAlign:'center',
                                    flexDirection:'column',
                                    justifyContent:'space-around'
                                }}>
                            
                                    <Text style={{fontSize: 28, textAlign:'center'}}>07:28:07</Text>
                                    <Text style={{textAlign:'center'}}>Absen Masuk</Text>
                                </View>
                                <View style={{
                                    width:0,
                                    marginRight:20,
                                    marginLeft:20,
                                    height: 50,
                                    marginTop:10,
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    borderRadius: 1
                                    }} >

                                </View>
                                <View style={{
                                    textAlign:'center',
                                    flexDirection:'column',
                                    justifyContent:'space-around'
                                }}>
                                    <Icon name={'fingerprint'} size={45} style={{color:'#74C6F4', textAlign:'center'}} />
                                    <Text style={{ marginTop: 2,textAlign:'center'}}>Absen Keluar</Text>
                                </View>
                            </View>                            
                        </View>
                    </View>
                      {/* Tombol Absen */}
                      <TouchableOpacity onPress={() => {this.props.navigation.push('AmbilAbsen')}}  style={{
                        flexDirection:'column',                  
                        justifyContent: 'space-between'
                    }}>
                    <LinearGradient
                      
                        colors={['#FF8B7F', '#FF595F', '#FF7570']}
                        style={{flexDirection:'row', alignItems: 'center', borderRadius: 5, marginTop:10, 
                                 borderTopRightRadius:10, borderTopLeftRadius:10}}>
                    
                    <Icon name={'fingerprint'} size={58} style={{ color:'#74C6F4', padding:20}} />
                    <Text style={{color: '#fff',  justifyContent: 'space-between', fontSize:17, width:210, padding:2}}>Tekan tombol disamping untuk mengambil absen keluar</Text>
            
                </LinearGradient>
                </TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default HomeAbon;
const styles= StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    
    timeText: {
      fontWeight:'bold',textAlign:"center",alignItems: 'center',fontSize:39,
      color: '#74C6F4'
    },
    daysText: {
      color: '#000',
      fontSize: 21,textAlign:"center",alignItems: 'center'
    }
});