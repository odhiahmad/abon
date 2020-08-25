import React, { Component,useState } from "react";
import {
    View, Image, Alert,
    Text, TextInput, TouchableOpacity,
    StyleSheet,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import Loader from './components/loader';

const LoginActivity = props => {
    let [username, setUserEmail] = useState('');
    let [password, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
  
    const handleSubmitPress = () => {
      setErrortext('');
      if (!username) {
        alert('Mohon masukkan NIP/Username anda');
        return;
      }
      if (!password) {
        alert('Mohon masukkan password anda');
        return;
      }
      setLoading(true);
        let details = {
                    'username': username,
                    'password': password
                };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
      formBody = formBody.join('&');
  
      fetch('http://abon.sumbarprov.go.id/rest_abon/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then((response) => response.json())
        .then((json) => {
          //Hide Loader
          setLoading(false);

          console.log(json);
          if (json.response == 1) {
            AsyncStorage.setItem('pegawai', json.result[0].pegawai);
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
            AsyncStorage.setItem('group', json.result[0].group);

            props.navigation.navigate('Home', { Name: username });
          } else {
            setErrortext('Mohon periksa kembali NIP/Username atau password Anda');
            console.log('Mohon periksa kembali NIP/Username atau password Anda');
          }
        })
        .catch(error => {
          //Hide Loader
          setLoading(false);
          console.error(error);
          alert('Anda sedang tidak terhubung ke jaringan internet')
        });
    };

return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
    
        <View style={{ marginTop: 10 }}>
         
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: '80%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 10,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
            <TextInput
                    placeholder="NIP / Username"
                    onChangeText={username => setUserEmail(username)}
                    underlineColorAndroid='transparent'
                    style={styles.inputStyle}/>
            {/* <TextInput
               onChangeText={username => setUserEmail(username)}
                returnKeyType='next'
             
                keyboardType='default'
                autoCapitalize = 'none'
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.passwordInput.focus()}
                style={{borderColor:'#e0e0e0',borderWidth:1, paddingVertical:10, paddingHorizontal:20, borderRadius:20, fontSize: 16,marginBottom:10}}
                placeholder='NIP / Username'/> */}
            </View>
            <View style={styles.SectionStyle}>
            <TextInput
                    placeholder="Password"
                    onChangeText={password => setUserPassword(password)}
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    style={styles.inputStyle}
                    secureTextEntry={true} />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
           
         
        </View>
    </View>
  );
};
export default LoginActivity;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#00AEEF',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#00AEEF',
      height: 40,
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
    },
    registerTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 12,
    },
});
