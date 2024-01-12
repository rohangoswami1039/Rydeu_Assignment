import React, { useEffect, useState } from 'react';
import { View, Text,useColorScheme } from 'react-native'
import { Button } from '@rneui/base'
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 
import  Entypo  from 'react-native-vector-icons/Entypo'; 
import firestore from '@react-native-firebase/firestore';


export default function Account_screen({navigation}) {
  const [loading,set_loading]= useState(false)

  const colorScheme = useColorScheme();
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        divider_line:"#fff",
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        divider_line:"#C51605",
      };
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5, color: getThemeStyles().color }}>
            Acc<Text style={{ color: '#4964FF' }}>ount</Text>
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: getThemeStyles().backgroundColor,
      },
      headerTintColor: getThemeStyles().backgroundColor,
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          
        </View>
      ),
    });
  }, [navigation, colorScheme]);

  const User_SignOut = async ()=>{
    set_loading(true)
    const userRef = firestore().collection('Users').doc(auth().currentUser.uid);
    userRef.update({
      online:false,
      lastSeen:firestore.FieldValue.serverTimestamp(),
    }).then(async (e)=>{
      await auth().signOut().then((e)=>{
        console.log("User Signed out")
        set_loading(false)
      }).catch((e)=>{
        console.log(e)
      })
    })
  }

  return (
    <View style={{flex:1,backgroundColor:getThemeStyles().backgroundColor}}> 
      <Text>Account_screen</Text>
      <Button title={'Sign Out'} loading={loading} onPress={User_SignOut}/>
    </View>
  )
}