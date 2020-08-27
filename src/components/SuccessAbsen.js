import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet, TouchableOpacity
} from "react-native";

import { StackActions, NavigationActions } from 'react-navigation';

class SuccessAbsen extends Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props){
    super(props)
    this.state={
      tanggal: this.props.navigation.state.params.tanggal,
      jam:this.props.navigation.state.params.jam
    }
  }

  reset = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeScreen'})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:18,color:'#2D3137',textAlign:'center'}}>Terimakasih Anda telah melakukan absen</Text>
        <View style={{marginTop:20, borderWidth:1, borderColor:'1095E8',borderRadius:5, padding:20}}>
          <Text style={{fontWeight:'bold',fontSize:15,color:'#2D3137',textAlign:'center'}}>Tanggal : {this.state.tanggal}</Text>
          <Text style={{fontWeight:'bold',fontSize:15,color:'#2D3137',textAlign:'center'}}>Jam : {this.state.jam}</Text>
        </View>
        <TouchableOpacity onPress={this.reset} style={{marginTop:20,backgroundColor:'#1095E8',paddingVertical:10, paddingHorizontal:30,borderRadius:9}}>
          <Text style={{fontSize:13,textAlign:'center',color:'#fff'}}>Oke</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SuccessAbsen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:20,
    flexDirection:'column'
  }
});