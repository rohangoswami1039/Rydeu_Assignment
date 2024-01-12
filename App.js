import React, { useEffect, useState } from 'react';
import {SafeAreaView,StatusBar,StyleSheet,Text,useColorScheme,View,AppState} from 'react-native';
import Login from './src/Components/Login';
import OTP from './src/Components/OTP';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Main from './src/Components/Main';
import Verify_Add_Phone from './src/Components/Screens/Verify_Add_Phone';
import Add_Phone from './src/Components/Screens/Add_Phone';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import Chat_screen from './src/Components/Screens/Chats Screens/Chat_screen';
import Srories_screen from './src/Components/Screens/Chats Screens/Srories_screen';
import firestore from '@react-native-firebase/firestore';
import Friend_Request from './src/Components/Screens/Chats Screens/Friend_Request';

function App(){
  const Stack = createNativeStackNavigator()
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  const writeToFirestoreIfNotExists = async (userData) => {
    const userRef = firestore().collection('Users').doc(userData.uid);
    try {
      const doc = await userRef.get();
      if (!doc.exists) {
        await userRef.set(userData);
        console.log('User data has been written to Firestore');
      }else if(doc.exists && doc.data().online==false){
        await userRef.update({
          online:true,
          lastSeen:firestore.FieldValue.serverTimestamp(),
        }).then((e)=>{
          console.log("User last seen has been updated")
        }).catch((e)=>{
          console.log(e)
        })
      } 
      
      else {
        console.log('User data already exists in Firestore');
      }
    } catch (error) {
      console.error('Error checking/writing to Firestore:', error);
    }
  };

  const Write_last_seen = async(AppState)=>{
    const {uid,phoneNumber} =user
    const userRef = firestore().collection('Users').doc(uid);
    if (AppState == 'active'){
      try {
        const doc = await userRef.get();
        if (doc.exists ) {
          await userRef.update({
            online:true,
            lastSeen:firestore.FieldValue.serverTimestamp(),
          })
          console.log('Last Seen Updated to the firestore');
        } else {
          console.log('There is no user data');
        }
      } catch (error) {
        console.error('Error checking/writing to Firestore:', error);
      }
    }
    else if (AppState == 'background') {
      try {
        const doc = await userRef.get();
  
        if (doc.exists ) {
          await userRef.update({
            online:false,
            lastSeen:firestore.FieldValue.serverTimestamp(),
          })
          console.log('Last Seen Updated to the firestore');
        } else {
          console.log('There is no user data');
        }
      } catch (error) {
        console.error('Error checking/writing to Firestore:', error);
      }
    }
  }

  const handleAppStateChange = async (AppState)=>{
    if (AppState == 'active'){
      Write_last_seen(AppState)
    }
    else if (AppState == 'background') {
      Write_last_seen(AppState)
    }
  }


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      const { uid, phoneNumber} = user;
      const userData = {
        uid,
        online:true,
        phone: phoneNumber,
      };

      writeToFirestoreIfNotExists(userData);
    }
  }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; 
    }, []);

    useEffect(() => {
      const subscription = AppState.addEventListener('change', handleAppStateChange);
  
      return () => {
        subscription.remove();
      };
    }, [user]);
    if (initializing) return <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <Text>Loading...</Text>
    </View>;

  if (!user) {
    return (
      <>
      <GestureHandlerRootView style={{ flex: 1 }}>
       <NavigationContainer>
         <Stack.Navigator initialRouteName='login'>
           <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
           <Stack.Screen name='OTP' component={OTP} options={{headerShown:false}} />
         </Stack.Navigator>
       </NavigationContainer>
       </GestureHandlerRootView>
     </>
    ); 
  }

 
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
       <NavigationContainer>
         <Stack.Navigator initialRouteName='Main'>
           <Stack.Screen name='Main' component={Main} options={{headerShown:false}} />
           <Stack.Screen name='Chat_screen' component={Chat_screen} options={{headerShown:false}} />
           <Stack.Screen name='Stories_screen' component={Srories_screen} options={{headerShown:false}} />
           <Stack.Screen name='Request' component={Friend_Request} options={{headerShown:false}} />
         </Stack.Navigator> 
       </NavigationContainer>
       </NativeBaseProvider>
       </GestureHandlerRootView>
     </>
  );
}

export default App;


