import React, { useState, useEffect } from 'react';
import { ActivityIndicator,View, Image,Text } from 'react-native';

import imagename from './logo.png' 
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('pegawai').then(value =>
        props.navigation.navigate(
          value === null ? 'Auth' : 'Home'
        )
      );
    }, 5000);
  }, []);


    return (
      <View style={styles.viewStyles}>
          <Image source={require('../assets/bg.png')} style={styles.backgroundImage}></Image>
        
          <View style={styles.logoAbon}>    
              <Image source={imagename}
                      style={{ width: 160, height: 160, alignItems:'center' }}/>   
          </View> 
          <ActivityIndicator
            animating={animating}
            color='red'
            size="large"
            style={styles.activityIndicator}
          />
          <Text style={ styles.text }>1.0</Text>
      </View>
    );
  
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  backgroundImage: {
    width:'100%', height:'100%',
    flex: 1,justifyContent: 'center',
    resizeMode: 'stretch', // or 'stretch'
  },
  logoAbon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  }
}

export default SplashScreen;