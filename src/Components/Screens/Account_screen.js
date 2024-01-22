import React, { useEffect, useState } from 'react';
import { View, Text,useColorScheme } from 'react-native'
import { Button } from '@rneui/base'
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 
import  Entypo  from 'react-native-vector-icons/Entypo'; 
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

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
  const navigator = useNavigation()

 const handle_signout = ()=>{
  console.log("User Signed Out")
  navigator.replace("login")

 }

  return (
  <View style={{ flex: 1, backgroundColor: getThemeStyles().backgroundColor, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: getThemeStyles().color, marginBottom: 20 }}>
       Sign Out From the Account 
      </Text>
      {/* Add more styled components as needed */}
      <TouchableOpacity onPress={handle_signout} style={{ backgroundColor: '#4964FF', padding: 15, borderRadius: 8, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}