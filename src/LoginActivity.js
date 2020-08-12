import React, { Component } from "react";
import {
    View,Image,
    Text,TextInput, TouchableOpacity,
    StyleSheet,
} from "react-native";
import { StackNavigator } from 'react-navigation';
import imagename from './logo.png' 

class LoginActivity extends Component {
    static navigationOptions =
    {
       title: 'LoginActivity',
    };
  
    constructor(props) {
        super(props)  
        this.state = {  
        UserEmail: '',
        UserPassword: ''  
        }  
    }
  
    UserLoginFunction = () =>{
    
        this.props.navigation.navigate('Home', { });
    // const { UserEmail }  = this.state ;
    // const { UserPassword }  = this.state ;
    
    
    // fetch('http://abon.sumbarprov.go.id/rest_abon/api/login', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
        
    //         username: UserEmail,  
    //         password: UserPassword,
    //         device_id : '',
    //         device_model : '',
    //         device_device :'',
    //         device_hardware:'',
    //         token_firebase:''
        
    //     })
        
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             if(responseJson === '1')
    //             {
    //                 this.props.navigation.navigate('Home', { Email: UserEmail });
        
    //             }
    //             else{
        
    //             Alert.alert(responseJson);
    //             }
        
    //         }).catch((error) => {
    //             console.error(error);
    //         });
    }
  
   render() {
        return (
            <View style={styles.container}>          
                <View style={{
                            marginBottom:20,
                            alignItems:'center'}}>    
                    <Image source={imagename}
                            style={{ width: 160, height: 160, alignItems:'center' }}/>   
                </View>

                <TextInput
                    placeholder="NIP / Username"
                    onChangeText={UserEmail => this.setState({UserEmail})}
                    underlineColorAndroid='transparent'  
                    style={styles.TextInputStyleClass} />
        
                <TextInput
                    placeholder="Password"  
                    onChangeText={UserPassword => this.setState({UserPassword})}
                    underlineColorAndroid='transparent'  
                    style={styles.TextInputStyleClass}  
                    secureTextEntry={true} />

                <TouchableOpacity onPress={this.UserLoginFunction} style={{
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-between',marginTop:20}}>
                    <View style={{
                        paddingVertical:10,
                        paddingHorizontal:10,
                        borderWidth: 1,
                        width:150,
                        borderColor:'#DD443A',
                        backgroundColor:'#DD443A',
                        borderRadius: 10}}>                        
                        <Text style={{textAlign:'center',fontSize:15, color:'white', fontWeight:"bold"}}>Masuk</Text>
                    </View>        
                </TouchableOpacity>          
            </View>             
        );
    }
 }
 
export default LoginActivity;
const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        paddingHorizontal:25,
        paddingVertical:25,
        backgroundColor:'white'
    },   
    TextInputStyleClass: { 
        padding:8,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15 ,     
    },
         
    TextComponentStyle: {
        fontSize: 20,
        color: "#00AEEF",
        textAlign: 'center', 
        marginBottom: 15
    }
    
});
