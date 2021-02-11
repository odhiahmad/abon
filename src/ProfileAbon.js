import React, {Component} from "react";
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import ProgressCircle from 'react-native-progress-circle'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {_baseURL_} from "../constant";
import {Header} from "react-native-elements";

export const onSignOut = () => AsyncStorage.clear();

class ProfileAbon extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            nama_asn: 'Nama ASN',
            username: '',
            jabatan: 'Jabatan',
            isError: false,
            refreshing: false,
            isLoading: true,
            average: '',
            average_color: '',
            jumlah_telat: '',
            jam_telat: '',
            average_percent: '',
            pulang_cepat: '',
            durasi: [],
        }
        AsyncStorage.getItem('nama_asn').then((nama_asn) => {
            if (nama_asn) {
                this.setState({nama_asn: nama_asn});
            }
        });
        AsyncStorage.getItem('username').then((username) => {
            if (username) {
                this.setState({username: username});
            }
        });
        AsyncStorage.getItem('jabatan').then((jabatan) => {
            if (jabatan) {
                this.setState({jabatan: jabatan});
            }
        });
    }

    componentDidMount() {
        this.feedData();
    }

    _onRefresh = () => {
        this.setState({refreshing: true, isError: false});
        this.feedData().then(() => {
            this.setState({refreshing: false});
        });
    }

    async feedData() {
        const token = await AsyncStorage.getItem('username');
        return fetch(_baseURL_ + 'biodata_pegawai?nip=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'success') {
                    this.setState({
                        durasi: responseJson.durasi,
                        average_color: responseJson.durasi[0].average_color,
                        average_percent: responseJson.durasi[0].average_percent,
                        average: responseJson.durasi[0].average,
                        jumlah_telat: responseJson.rekap[0].jumlah_telat,
                        jam_telat: responseJson.rekap[0].jam_telat,
                        pulang_cepat: responseJson.rekap[0].pulang_cepat
                    });

                    console.log(responseJson.durasi)
                } else {
                    alert('Sesi anda telah habis, silahkan Logout dan Login kembali')
                    this.setState({
                        isLoading: false,
                        refreshing: false,
                    })
                }
            })
            .catch((error) => {
                // console.error(error);
                this.setState({
                    isLoading: false,
                    isError: true
                })
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: 'light-content'}}
                    centerComponent={{text: 'Profile', style: {color: '#fff', fontSize: 16, fontWeight: 'bold'}}}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    <View style={styles.wrapper}>
                        <View style={styles.boxHeader}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 23,
                                    fontWeight: 'bold',
                                    marginBottom: 3,
                                    color: '#2D3137'
                                }}>{this.state.nama_asn}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    marginBottom: 3
                                }}> {this.state.username}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: '200',
                                    marginBottom: 5,
                                    fontStyle: 'italic'
                                }}>{this.state.jabatan}</Text>
                                <TouchableOpacity
                                    onPress={() => navigate("PdfViewer")}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#FF6063',
                                        padding: 5,
                                        borderRadius: 3,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                    <Icon name={'book'} size={15}
                                          style={{color: '#FF565E', textAlign: 'center', padding: 3}}/>
                                    <Text style={{
                                        color: '#FF565E',
                                        fontWeight: 'bold',
                                        paddingHorizontal: 3,
                                        paddingVertical: 3,
                                        fontSize: 14
                                    }}>Panduan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.boxProgress}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#2D3137', marginBottom: 20}}>Rata-rata
                                Bulan ini</Text>
                            <ProgressCircle
                                percent={this.state.average_percent}
                                radius={60}
                                borderWidth={8}
                                color={this.state.average_color}
                                shadowColor="#f4f4f4"
                                bgColor="#fff">
                                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <Text style={{fontSize: 25}}>{this.state.average}</Text>
                                    <Text style={{fontSize: 13}}>Jam</Text>
                                </View>
                            </ProgressCircle>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <View style={{
                                    flexDirection: 'column',
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                                        <Text style={{fontWeight: 'bold'}}>Terlambat : </Text>
                                        <Text>{this.state.jumlah_telat} kali ({this.state.jam_telat})</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Pulang Cepat : </Text>
                                        <Text>{this.state.pulang_cepat}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <LinearGradient colors={['#00AEEF', '#00B9F2']}
                                                style={{borderRadius: 10, margin: 20, width: 131}}>
                                    <TouchableOpacity style={{paddingHorizontal: 40, paddingVertical: 15}}
                                                      onPress={() => onSignOut().then(() => this.props.navigation.navigate("Auth"))}>
                                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Log Out</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}

export default ProfileAbon;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBanner: {
        height: 170,
        width: '100%',
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
    },
    wrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    boxHeader: {
        elevation: 1,
        backgroundColor: '#fff',
        shadowOffset: {width: 2, height: 2,},
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxProgress: {
        elevation: 1,
        backgroundColor: '#fff',
        shadowOffset: {width: 2, height: 2,},
        shadowColor: '#e0e0e0',
        shadowOpacity: 1.0,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    floatButton: {
        borderRadius: 30,
        backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center'
    }
});
