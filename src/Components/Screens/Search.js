import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Input } from 'native-base'
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 

export default function Search({navigation}) {

  const colorScheme = useColorScheme();
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        secondary_text:'#ced4da'        
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        secondary_text:'#4a4e69'
      };
    }
  };
  
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5, color: getThemeStyles().color }}>
            Disc<Text style={{ color: '#4964FF' }}>over</Text>
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: getThemeStyles().backgroundColor,
      },
      headerTintColor: getThemeStyles().backgroundColor,
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 30 }}>
          
        </View>
      ),
    });
  }, [navigation, colorScheme]);




  
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <View style={{ flex: 1, backgroundColor: getThemeStyles().backgroundColor }}>
        <View style={{justifyContent:'space-between',alignItems: "center",flexDirection:'row',marginTop:15,margin:10}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <Input
                    style={{borderWidth:0,fontSize: 16,color:getThemeStyles().color}}
                    variant={'rounded'}
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>
            <View>
                <TouchableOpacity style={{marginLeft:10}} onPress={() => setSearchQuery('')}>
                    <AntDesign name="closecircle" size={25} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:1}}>
            <Text>{searchQuery}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({})