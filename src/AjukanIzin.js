import React, { Component } from "react";
import {
    View,
    Text,TextInput ,
    StyleSheet,TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

class AjukanIzin extends Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            favColor: undefined,
            items2: [
                {
                    label: 'Hadir Terlambat',
                    value: 'Hadir Terlambat',
                },
                {
                    label: 'Pulang lebih cepat',
                    value: 'Pulang lebih cepat',
                },
                {
                    label: 'Cuti',
                    value: 'Cuti',
                },
                {
                    label: 'Sakit',
                    value: 'Sakit',
                },
                {
                    label: 'Izin',
                    value: 'Izin',
                },
                {
                    label: 'Dinas Luar',
                    value: 'Dinas Luar',
                },
                {
                    label: 'Tugas Pendidikan (Diklat, Workshop, dll',
                    value: 'Tugas Pendidikan (Diklat, Workshop, dll',
                },
            ],
        };
    }
   
    render(){       
        return(
            <View style={styles.container}>
              
             <Text style={{fontSize:18,marginLeft:10, marginTop:20}}>Jenis</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Pilih Jenis Izin',
                        value: null,
                    }}
                    items={this.state.items2}
                    onValueChange={(value) => {
                        this.setState({
                            favSport: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.picker.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.company.focus();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.favSport}
                    ref={(el) => {
                        this.inputRefs.picker2 = el;
                    }}
                />

                <Text style={{fontSize:18,marginLeft:10, marginTop:20}}>Perihal</Text>            
                <TextInput  style={pickerSelectStyles.inputIOS}
                            placeholder="Masukan Perihal" onChangeText={(text) => this.setState({text})}/>  
              
                <TouchableOpacity onPress={() => {this.props.navigation.push('KirimIzin')}}  style={{
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
    
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        marginLeft:10,
        marginTop:5,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});