import React, { Component } from "react";
import {
    View,
    Text,TextInput ,ScrollView,SafeAreaView,
    StyleSheet,TouchableOpacity, Alert
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

class AjukanIzin extends Component {
  reset(){
    this.props.navigation.navigate('Agenda');
  }

  constructor(props) {
      super(props);
      this.inputRefs = {};
      this.state = {
          perihal:'',
          username:'',
          tanggalAwal:'',
          tanggalAkhir:'',
          jenisIzin: undefined,
          items2: [
              {
                  label: 'Hadir Terlambat',
                  value: '1',
              },
              {
                  label: 'Pulang lebih cepat',
                  value: '2',
              },
              {
                  label: 'Cuti',
                  value: '4',
              },
              {
                  label: 'Sakit',
                  value: '5',
              },
              {
                  label: 'Izin',
                  value: '6',
              },
              {
                  label: 'Dinas Luar',
                  value: '7',
              },
              {
                  label: 'Tugas Pendidikan (Diklat, Workshop, dll',
                  value: '8',
              },
          ],
      };
      
  this.reset = this.reset.bind(this)
  AsyncStorage.getItem('username', (error, result) => {
      if (result) {
          this.setState({
              username: result
          });
      }
      });
      AsyncStorage.getItem('startDate', (error, result) => {
          if (result) {
              this.setState({
                  tanggalAwal: result
              });
          }
      });
      AsyncStorage.getItem('endDate', (error, result) => {
          if (result) {
              this.setState({
                  tanggalAkhir: result
              });
          }
      });
  }
   
    
  handleSaveClick = async () => {
    if (this.state.jenisIzin == '1') {
      this.setState({
        isLoading: true
      })

      if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal == '' ) {
        Alert.alert('Mohon Isi Semua Data')
        this.setState({
          isLoading: false
        })
      }else{
        let details = {
            id_izin: this.state.jenisIzin,
            tanggal: '',
            perihal: this.state.perihal,
            nip: this.state.username,
            tanggal_awal: this.state.tanggalAwal,
            tanggal_akhir: this.state.tanggalAwal
        };
          let formBody = [];
          for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join('&');  
    
          return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == 'success') {
                Alert.alert(json.catatan)
              this.setState({
                loading: true
              })
              this.reset()
            } else {                 
                Alert.alert(json.catatan)
              this.setState({
                loading: false
              })
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
          });
    
        }

    } else if (this.state.jenisIzin == '2') {
      this.setState({
        isLoading: true
      })
      if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal =='') {
        Alert.alert('Mohon Isi Semua Data')
        this.setState({
          isLoading: false
        })
      }else{
        let details = {
            id_izin: this.state.jenisIzin,
            tanggal: '',
            perihal: this.state.perihal,
            nip: this.state.username,
            tanggal_awal: this.state.tanggalAwal,
            tanggal_akhir: this.state.tanggalAwal
        };
          let formBody = [];
          for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join('&');  
    
          return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((json) => {
            if (json.status == 'success') {
                Alert.alert(json.catatan)
              this.setState({
                loading: true
              })
              this.reset()
            } else {                 
                Alert.alert(json.catatan)
              this.setState({
                loading: false
              })
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
          });  
    }}
    else if (this.state.jenisIzin == '4') {
        this.setState({
          isLoading: true
        })
        if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal ==''|| this.state.tanggalAkhir =='') {
          Alert.alert('Mohon Isi Semua Data')
          this.setState({
            isLoading: false
          })
        }else{
          let details = {
              id_izin: this.state.jenisIzin,
              tanggal: '',
              perihal: this.state.perihal,
              nip: this.state.username,
              tanggal_awal: this.state.tanggalAwal,
              tanggal_akhir: this.state.tanggalAkhir
          };
            let formBody = [];
            for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join('&');  
      
            return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.status == 'success') {
                  Alert.alert(json.catatan)
                this.setState({
                  loading: true
                })
                this.reset()
              } else {                 
                  Alert.alert(json.catatan)
                this.setState({
                  loading: false
                })
              }
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
            });  
    }}
    else if (this.state.jenisIzin == '5') {
        this.setState({
          isLoading: true
        })
        if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal ==''|| this.state.tanggalAkhir =='') {
          Alert.alert('Mohon Isi Semua Data')
          this.setState({
            isLoading: false
          })
        }else{
          let details = {
              id_izin: this.state.jenisIzin,
              tanggal: '',
              perihal: this.state.perihal,
              nip: this.state.username,
              tanggal_awal: this.state.tanggalAwal,
              tanggal_akhir: this.state.tanggalAkhir
          };
            let formBody = [];
            for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join('&');  
      
            return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.status == 'success') {
                  Alert.alert(json.catatan)
                this.setState({
                  loading: true
                })
                this.reset()
              } else {                 
                  Alert.alert(json.catatan)
                this.setState({
                  loading: false
                })
              }
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
            });  
    }}
    else if (this.state.jenisIzin == '6') {
        this.setState({
          isLoading: true
        })
        if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal ==''|| this.state.tanggalAkhir =='') {
          Alert.alert('Mohon Isi Semua Data')
          this.setState({
            isLoading: false
          })
        }else{
          let details = {
              id_izin: this.state.jenisIzin,
              tanggal: '',
              perihal: this.state.perihal,
              nip: this.state.username,
              tanggal_awal: this.state.tanggalAwal,
              tanggal_akhir: this.state.tanggalAkhir
          };
            let formBody = [];
            for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join('&');  
      
            return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.status == 'success') {
                  Alert.alert(json.catatan)
                this.setState({
                  loading: true
                })
                this.reset()
              } else {                 
                  Alert.alert(json.catatan)
                this.setState({
                  loading: false
                })
              }
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
            });  
    }}
    else if (this.state.jenisIzin == '7') {
        this.setState({
          isLoading: true
        })
        if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal ==''|| this.state.tanggalAkhir =='') {
          Alert.alert('Mohon Isi Semua Data')
          this.setState({
            isLoading: false
          })
        }else{
          let details = {
              id_izin: this.state.jenisIzin,
              tanggal: '',
              perihal: this.state.perihal,
              nip: this.state.username,
              tanggal_awal: this.state.tanggalAwal,
              tanggal_akhir: this.state.tanggalAkhir
          };
            let formBody = [];
            for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join('&');  
      
            return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.status == 'success') {
                  Alert.alert(json.catatan)
                this.setState({
                  loading: true
                })
                this.reset()
              } else {                 
                  Alert.alert(json.catatan)
                this.setState({
                  loading: false
                })
              }
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
            });  
    }}
    else if (this.state.jenisIzin == '8') {
        this.setState({
          isLoading: true
        })
        if (this.state.jenisIzin == '' || this.state.perihal == '' || this.state.tanggalAwal ==''|| this.state.tanggalAkhir =='') {
          Alert.alert('Mohon Isi Semua Data')
          this.setState({
            isLoading: false
          })
        }else{
          let details = {
              id_izin: this.state.jenisIzin,
              tanggal: '',
              perihal: this.state.perihal,
              nip: this.state.username,
              tanggal_awal: this.state.tanggalAwal,
              tanggal_akhir: this.state.tanggalAkhir
          };
            let formBody = [];
            for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join('&');  
      
            return fetch('http://abon.sumbarprov.go.id/rest_abon/api/izin',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((json) => {
              if (json.status == 'success') {
                  Alert.alert(json.catatan)
                this.setState({
                  loading: true
                })
                this.reset()
              } else {                 
                  Alert.alert(json.catatan)
                this.setState({
                  loading: false
                })
              }
            })
            .catch((error) => {
              console.error(error);
              Alert.alert('Anda sedang tidak terhubung ke jaringan internet')
            });  
    }}
  }
   
  render(){        
    return(
      <SafeAreaView style={{backgroundColor:'#FFF', flex:1,paddingTop: Platform.OS === 'android' ? 10 : 0}}>
          <ScrollView>
            <View style={styles.container}>
          
              <Text style={{fontSize:16,marginLeft:10, marginTop:20}}>Jenis: </Text>
              <View >                           
                <RNPickerSelect
                    placeholder={{                
                        label: 'Pilih Jenis Izin',
                        value: null,
                        color: '#9EA0A4',
                    }}
                    items={this.state.items2}
                    onValueChange={value => {
                    this.setState({
                        jenisIzin: value,
                    });
                    }}
                    onUpArrow={() => {
                    this.inputRefs.firstTextInput.focus();
                    }}
                    onDownArrow={() => {
                    this.inputRefs.jenisIzin.togglePicker();
                    }}
                    style={pickerSelectStyles}
                    value={this.state.jenisIzin}
                    ref={el => {
                    this.inputRefs.jenisIzin = el;
                    }} />       
              </View>
              
              <Text style={{fontSize:16,marginLeft:10, marginTop:20}}>Perihal :</Text>            
              <TextInput
                  onChangeText={ (text) => this.setState({ perihal: text }) }
                  returnKeyType='next'
                  value={this.state.perihal}
                  autoCapitalize = 'none'
                  underlineColorAndroid='transparent'
                  style={styles.inputIOS}    
                  placeholder='Masukan Perihal'/>
              {
                this.state.jenisIzin == '1' && //Hadir Terlambat
                (
                    <View style={{marginTop:25}}>
                        <Text style={{fontSize:16,marginLeft:10}}>Tanggal</Text>
                        
                        <DatePicker
                            style={{ fontSize: 14,
                                    marginLeft:10, 
                                    marginTop:5,
                                    justifyContent:'space-between',
                                    borderColor: 'gray',
                                    backgroundColor: 'white',
                                    color: 'black'}}    
                            mode="date"
                            date={this.state.tanggalAwal}
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                            },
                            dateInput: {
                                marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                alignItems:'flex-start'
                                }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                        />
                    </View>                    
                )
              }
              {
                this.state.jenisIzin == '2' && //Pulang lebih cepat
                (
                  <View style={{marginTop:25}}>
                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal :</Text>
                  <DatePicker
                      style={{ fontSize: 14,
                              marginLeft:10, 
                              marginTop:5,
                              justifyContent:'space-between',
                              borderColor: 'gray',
                              backgroundColor: 'white',
                              color: 'black'}}    
                      mode="date"
                      date={this.state.tanggalAwal}
                      format="YYYY-MM-DD"
                      placeholder="Pilih Tanggal"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                                  dateIcon: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 4,
                              },
                              dateInput: {
                                  marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                  alignItems:'flex-start'
                                  }
                              // ... You can check the source to find the other keys.
                              }}
                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                  />
                  </View>
                )
              }
              {
                  this.state.jenisIzin == '4' &&  //Cuti
                  (
                      <View>
                      {
                        this.state.tanggalAkhir === '--' 
                          ? <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="ggg"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                          : <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      showIcon={false}
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateInput: {
                                          borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAkhir}
                                      format="YYYY-MM-DD"
                                      showIcon={false}
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateInput: {
                                          borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                      }
                      </View>
                  )                  
              }                
              
              {
                this.state.jenisIzin == '5' && //Sakit
                (
                  <View>
                      {
                        this.state.tanggalAkhir === '--' 
                          ? <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      showIcon={false}
                                      placeholder="ggg"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateInput: {
                                          borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                          : <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      showIcon={false}
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateInput: {
                                          borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAkhir}
                                      format="YYYY-MM-DD"
                                      showIcon={false}
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateInput: {
                                          borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                      }
                      </View>
                  
                )
              }
              {
                this.state.jenisIzin == '6' && //Izin 
                (
                  <View>
                      {
                        this.state.tanggalAkhir === '--' 
                          ? <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="ggg"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                          : <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAkhir}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                      }
                      </View>
                  
                )
              }
              {
                this.state.jenisIzin == '7' && //Dinas Luar
                (
                  <View>
                      {
                        this.state.tanggalAkhir === '--' 
                          ? <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="ggg"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                          : <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAkhir}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                      }
                      </View>
                )
              }
              {
                this.state.jenisIzin == '8' && //Tugas Pendidikan
                (
                  <View>
                      {
                        this.state.tanggalAkhir === '--' 
                          ? <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="ggg"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                          : <View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Awal:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAwal}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAwal: date})}}
                                  />

                              </View>
                              <View style={{marginTop:25}}>
                                  <Text style={{fontSize:16,marginLeft:10}}>Tanggal Akhir:</Text>
                                  <DatePicker
                                      style={{ fontSize: 14,
                                              marginLeft:10, 
                                              marginTop:5,
                                              justifyContent:'space-between',
                                              borderColor: 'gray',
                                              backgroundColor: 'white',
                                              color: 'black'}}    
                                      mode="date"
                                      date={this.state.tanggalAkhir}
                                      format="YYYY-MM-DD"
                                      placeholder="Pilih Tanggal"
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                          dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                      },
                                      dateInput: {
                                          marginLeft:46, borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomColor:'#e0e0e0',
                                          alignItems:'flex-start'
                                          }
                                      // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(date) => {this.setState({tanggalAkhir: date})}}
                                  />
                              </View>
                          </View>
                      }
                      </View>                  
                )
              }
              
              <TouchableOpacity onPress={this.handleSaveClick}  style={{
                      flexDirection:'column',
                      alignItems:'center',
                      justifyContent:'space-between',marginTop:20}}>
                  <View style={{
                      paddingVertical:10,
                      paddingHorizontal:10,
                      borderWidth: 1,
                      borderColor:'#00AEEF',
                      backgroundColor:'#00AEEF',
                      borderRadius: 10}}>                        
                      <Text style={{textAlign:'center',fontSize:15, color:'white', fontWeight:"bold"}}>Ajukan Izin</Text>
                  </View>        
              </TouchableOpacity>               
            </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default AjukanIzin;
const styles= StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal:15,
      paddingVertical:15,
      backgroundColor:'white'
  },  
  inputIOS: {
    fontSize: 14,
    marginLeft:10, 
    padding:10,       
    borderWidth: 1,
    marginTop:5,
    marginRight:10,
    justifyContent:'space-between',
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});
