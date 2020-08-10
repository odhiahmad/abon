import React, { Component } from "react";
import {
    View,
    Text,TextInput ,
    StyleSheet,TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';

class AjukanIzin extends Component {
    constructor(props){
        super(props);
        this.state= {text:''};
    }
    render(){       
        return(
            <View style={styles.container}>
             <Text style={{fontSize:18,marginLeft:10, marginTop:20}}>Jenis</Text>
                <View style={{ flexDirection:'row', borderColor:'grey',height:40, marginVertical:10, marginHorizontal:10, color:'black', 
                                        marginBottom:30,paddingHorizontal:10, paddingVertical:10,marginTop:10,
                                        justifyContent:'space-between',
                                        borderWidth:1, borderColor: '#404040',borderRadius:5}}>
                           
                    <RNPickerSelect 
                            onValueChange={(value) => console.log(value)}
                            items={[
                                { label: 'Hadir Terlambat', value: 'baseball' },
                                { label: 'Pulang lebih cepat', value: 'hockey' },
                                { label: 'Cuti', value: 'hockey' },
                                { label: 'Sakit', value: 'hockey' },
                                { label: 'Izin', value: 'hockey' },
                                { label: 'Dinas Luar', value: 'hockey' },
                                { label: 'Tugas Pendidikan (Diklat, Workshop, dll', value: 'hockey' },]}/>
                         <Icon name={'caretdown'} size={15} style={{color:'#404040', textAlign:'center'}} />  
                    </View> 
                    
                <Text style={{fontSize:18,marginLeft:10}}>Perihal</Text>
                <View style={{ flexDirection:'column', borderColor:'grey', marginVertical:10, height:50,marginHorizontal:10, 
                                color:'black', marginBottom:30,paddingHorizontal:10, paddingVertical:10,marginTop:10,
                                justifyContent:'space-around',borderWidth:1, borderColor: '#404040',borderRadius:5}}>
                    <TextInput style={{height:40, backgroundColor:'#fff', fontSize:18}}
                                placeholder="Perihal" onChangeText={(text) => this.setState({text})}/>                    
                </View>

                <TouchableOpacity onPress={() => {this.props.navigation.push('KirimIzin')}}  style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center', marginTop:20}}>
                    <View style={{
                        paddingVertical:10,
                        paddingHorizontal:10,
                        height: 50,
                        borderWidth: 1,
                        borderColor:'#00AEEF',
                        backgroundColor:'#00AEEF',
                        justifyContent:'center',
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
