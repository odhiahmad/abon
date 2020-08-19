import React from 'react';
import { View, Image,Text } from 'react-native';

import imagename from './logo.png' 

class SplashScreen extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        5000
      )
    )
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
          <Image source={require('../assets/bg.png')} style={styles.backgroundImage}></Image>
        
          <View style={styles.logoAbon}>    
              <Image source={imagename}
                      style={{ width: 160, height: 160, alignItems:'center' }}/>   
          </View> 
          <Text style={ styles.text }>1.0</Text>
      </View>
    );
  }
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
  }
}

export default SplashScreen;