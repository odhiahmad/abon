import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/HomeAbon'
import Agenda from './src/AgendaAbon'
import Riwayat from './src/RiwayatAbon'
import Profile from './src/ProfileAbon'
import AmbilAbsen from './src/AmbilAbsen'
import AjukanIzin from './src/AjukanIzin'
import RiwayatIzin from './src/RiwayatIzin'

import Icon from 'react-native-vector-icons/Feather';
import IconB from 'react-native-vector-icons/FontAwesome5';
import IconC from 'react-native-vector-icons/FontAwesome';

import LoginActivity from './src/LoginActivity'
import SplashScreen from './src/SplashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//Home Screen
const StackHome=()=>(
  <Stack.Navigator>

   <Stack.Screen name="Home" component={Home}
     options={{ 
     headerShown:false,
     }}
   />  
 <Stack.Screen name="AmbilAbsen" component={AmbilAbsen}
       options={{ title :'Ambil Absen',
     headerStyle:{
       backgroundColor:'white'
     },
     headerShown:true,
     }}
   />
</Stack.Navigator>
)
const StackAgenda=()=>(
  <Stack.Navigator>

   <Stack.Screen name="Agenda" component={Agenda}
       options={{ 
       headerShown:false,
     }}
   />  
    <Stack.Screen name="AjukanIzin" component={AjukanIzin}
       options={{ title :'Pengajuan Izin',
     headerStyle:{
       backgroundColor:'white'
     },
     headerShown:true,
     }}
    />
    <Stack.Screen name="RiwayatIzin" component={RiwayatIzin}
       options={{ title :'Riwayat Izin',
     headerStyle:{
       backgroundColor:'white',
      
     },
     headerShown:true,
     }}
    />
</Stack.Navigator>
)
const StackRiwayat=()=>(
  <Stack.Navigator>

   <Stack.Screen name="Riwayat" component={Riwayat}
      options={{ 
      headerShown:false,
     }}
   />  
     
</Stack.Navigator>
)
const StackProfile=()=>(
  <Stack.Navigator>

   <Stack.Screen name="Profile" component={Profile}
       options={{ 
       headerShown:false,
     }}/>  
      <Stack.Screen
      name="logout"
      component={logout}
      options={{ 
     headerShown:false,
     }}
    />
</Stack.Navigator>
)

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen}
          options={{ 
          headerShown:false,
          }
          }/>
          
        <Stack.Screen name="Auth" component={Auth}
         options={{ 
         headerShown:false,
         }}/>
        <Stack.Screen name="Home" component={HomeScreenStack}
         options={{ 
         headerShown:false,
        }}/>     

      </Stack.Navigator>       
    </NavigationContainer>
  );
}

function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="BottomTabStack"
      component={BottomTabStack}
      options={{ 
     headerShown:false,
     }}
    />
  </Stack.Navigator>
  );
}

function Auth({  }) {
  return (
    <Stack.Navigator initialRouteName="LoginActivity">
    <Stack.Screen
      name="LoginActivity"
      component={LoginActivity}
      options={{ 
     headerShown:false,
     }}
    />
  </Stack.Navigator>
  );
}
function logout({  }) {
  _simpleAlertHandler = () => {
    //function to make simple alert
    Alert.alert('Hello I am Simple Alert');
  };
}
function BottomTabStack() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#00AEEF',
      inactiveTintColor:'#e8e4e4f7'
 }}>
     <Tab.Screen name="Home" color={'#00AEEF'} component={StackHome}
       options={{
         tabBarLabel:'Home',
         tabBarIcon:({ color, size}) => (
           <Icon name={'home'} color={color} size={24}/>
         ),
     }}
     />
     <Tab.Screen name="Agenda" color={'#00AEEF'} component={StackAgenda}
     options={{
       tabBarLabel:'Agenda',
       tabBarIcon:({ color, size}) => (
         <IconB name={'calendar-alt'} color={color} size={24}/>
       ),
     }}
     />
     <Tab.Screen name="Riwayat" color={'#00AEEF'} component={StackRiwayat}
     options={{
       tabBarLabel:'Riwayat',
       tabBarIcon:({ color, size}) => (
         <IconC name={'list-alt'} color={color} size={24}/>
       ),
     }}
     />
      <Tab.Screen name="Profile" color={'#00AEEF'} component={StackProfile}
     options={{
       tabBarLabel:'Profile',
       tabBarIcon:({ color, size}) => (
         <Icon name={'user'} color={color} size={24}/>
       ),
     }}
     />
   </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
