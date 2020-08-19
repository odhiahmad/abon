import React, { Component } from "react";
import {
    View, Image, Alert,
    Text, TextInput, TouchableOpacity,
    StyleSheet,
} from "react-native";

import Loader from './components/loader';
import imagename from './logo.png'

class LoginActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserEmail: '',
            UserPassword: '',
            stat: '',
            result: [],
            child: [],
            isLoading: true
        }
    }

    _addData = () => {
        let details = {
            'username': this.state.UserEmail,
            'password': this.state.UserPassword
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        this.setState({
            isLoading: false
        })
        // http://abon.sumbarprov.go.id/rest_abon/api/login
        fetch('http://abon.sumbarprov.go.id/rest_abon/api/login', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer token',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((json) => {
                this.setState({
                    stat: json.message,
                    result: json.result
                })
                Alert.alert(this.state.stat);
                // console.log(this.state.result[0]);
                this.props.navigation.navigate('Home', { });
                for (let prop in this.state.result[0]) {
                    this.state.child.push(this.state.result[0][prop]);
                }

                console.log(this.state.child[8]);
                console.log(this.state.child[5]);
            })
            .catch((error) => {
                console.error(error);
            });;
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    marginBottom: 20,
                    alignItems: 'center'
                }}>
                    <Image source={imagename}
                        style={{ width: 160, height: 160, alignItems: 'center' }} />
                </View>

                <TextInput
                    placeholder="NIP / Username"
                    onChangeText={UserEmail => this.setState({ UserEmail })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass} />

                <TextInput
                    placeholder="Password"
                    onChangeText={UserPassword => this.setState({ UserPassword })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                    secureTextEntry={true} />

                <TouchableOpacity onPress={this._addData} style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between', marginTop: 20
                }}>
                    <View style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        width: 150,
                        borderColor: '#DD443A',
                        backgroundColor: '#DD443A',
                        borderRadius: 10
                    }}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', fontWeight: "bold" }}>Masuk</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginActivity;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 25,
        backgroundColor: 'white'
    },
    TextInputStyleClass: {
        padding: 8,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
    },

    TextComponentStyle: {
        fontSize: 20,
        color: "#00AEEF",
        textAlign: 'center',
        marginBottom: 15
    }

});
