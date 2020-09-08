import React, { Component } from "react";
import {
    View, Image, ActivityIndicator,
    Text, TextInput, TouchableOpacity,Dimensions,
    StyleSheet,
} from "react-native";
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './components/loader';

class LoginActivity extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor})=> (
      <Icon name='ios-home-outline' style={{color:tintColor}} />
    ),
    header: null
  }  

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password:'',
      loading: false,
      device_id:'',
      device_name:'',
      device_device:'',
      device_hardware:'',
      token: '-'
    }

    this.reset = this.reset.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  reset(){
    this.props.navigation.navigate('Home', { Name: this.state.username });
  }
  componentDidMount() {
    this.setState ({
      device_name:Device.modelName,
      device_id:Expo.Constants.deviceId,
      device_device : Device.brand,
      device_hardware:Device.manufacturer
    })
  }

  handleLogin () {
    const {navigate} = this.props.navigation;
    if (this.state.username == '' || this.state.password == '') {
      alert('Masukan Username dan Password yang Benar')
    } else {
      this.setState({
        loading: true
      })
      let details = {
        username: this.state.username,
        password: this.state.password,
        device_id: this.state.device_id,
        device_model: this.state.device_name,
        device_device: this.state.device_device,
        device_hardware: this.state.device_hardware,
        token_firebase: this.state.token
    };
      let formBody = [];
      for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join('&');  

      return fetch('http://abon.sumbarprov.go.id/rest_abon/api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.response == 1) {
          AsyncStorage.setItem('pegawai', json.result[0].pegawai);
          AsyncStorage.setItem('username', json.result[0].username);  
          AsyncStorage.setItem('nama_asn', json.result[0].nama_asn);            
          AsyncStorage.setItem('opd', json.result[0].opd);           
          AsyncStorage.setItem('nm_opd', json.result[0].nm_opd);           
          AsyncStorage.setItem('sub_opd', json.result[0].sub_opd);           
          AsyncStorage.setItem('nm_sub_opd', json.result[0].nm_sub_opd);           
          AsyncStorage.setItem('jabatan', json.result[0].jabatan);           
          AsyncStorage.setItem('nip', json.result[0].nip);                  
          AsyncStorage.setItem('id_eselon', json.result[0].id_eselon);                   
          AsyncStorage.setItem('eselon', json.result[0].eselon);                 
          AsyncStorage.setItem('pangkat', json.result[0].pangkat);                 
          AsyncStorage.setItem('jenjang', json.result[0].jenjang);   
          this.props.navigation.navigate('Home');
         
          this.setState({
            loading: true
          })
          this.reset()
        } else {
          console.log(this.state.device_name);
          console.log(this.state.device_id);
          console.log(this.state.device_device);
          console.log(this.state.device_hardware);
          alert(json.message)
          this.setState({
            password: '',
            loading: false
          })
        }
      })
      .catch((error) => {
        console.error(error);
          alert('Anda sedang tidak terhubung ke jaringan internet')
      });

    }
  }
  render(){
    if (this.state.loading) {
      return (
        <ActivityIndicator
              style={styles.indicator}
              animating={true}
              size="large"
            />
      );
    }
    return (
      <View style={styles.mainBody}>                
        <View style={styles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: 140,
                  height: 130,
                }}
              />
            <View style={styles.SectionStyle}>
            <TextInput
                    placeholder="NIP / Username"
                    onChangeText={ (text) => this.setState({ username: text }) }
                    underlineColorAndroid='transparent'
                    style={styles.inputStyle}/>
          
            </View>
            <View style={styles.SectionStyle}>
            <TextInput
                    placeholder="Password"
                    onChangeText={ (text) => this.setState({ password: text }) }
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    style={styles.inputStyle}
                    secureTextEntry={true} />
            </View>
          
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.handleLogin}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>         
        </View>
      </View>
    );
  }
};
export default LoginActivity;
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 20,
      height: Dimensions.get('window').height / 1
    },
    buttonStyle: {
      backgroundColor: '#00AEEF',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#00AEEF',
      height: 40,
      width:100,
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'gray',
    }
});
