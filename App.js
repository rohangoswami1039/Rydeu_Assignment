import React, { useEffect, useState } from 'react';
import {SafeAreaView,StatusBar,StyleSheet,Text,useColorScheme,View,AppState} from 'react-native';
import Login from './src/Components/Login';
import OTP from './src/Components/OTP';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Main from './src/Components/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';

function App(){
  const Stack = createNativeStackNavigator()
  
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
       <NavigationContainer>
         <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
           <Stack.Screen name='Main' component={Main} options={{headerShown:false}} />
         </Stack.Navigator> 
       </NavigationContainer>
       </NativeBaseProvider>
       </GestureHandlerRootView>
     </>
  );
}

export default App;


