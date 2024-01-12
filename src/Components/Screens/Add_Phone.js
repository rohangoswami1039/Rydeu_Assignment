import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Platform,
  UIManager,
  Image,
  useColorScheme,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Input } from "@rneui/themed";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Add_Phone() {
  const colorScheme = useColorScheme();
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        divider_line:"#fff",
        otp_line:'#fff',
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        divider_line:"#C51605",
        otp_line:'#191D23',
      };
    }
  };

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [animationLoaded, setAnimationLoaded] = useState(false);
  const mainContainerRef = useRef(null);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const navigation = useNavigation();
  const [loading,set_loading]= useState(false)


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      }
    );

    // Load animation after the initial render
    const loadAnimation = async () => {
      setAnimationLoaded(true)
    };

    return () => {
      loadAnimation();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleVerify = async () => {
    try{
      set_loading(true)
      await confirmation.confirm(value)
      console.log("Loin Success")
      navigation.navigate('Main')
      set_loading(false)
    }
    catch 
    {
      console.log("There is an error in the OTP Authentication Please try Again")
    }
    
  };

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Animatable.View
          ref={mainContainerRef}
          animation="slideInDown"
          duration={3000}
          style={styles.Main_container}
        >
          <StatusBar backgroundColor={getThemeStyles().backgroundColor} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
          <View style={{
                        marginTop: -20,
                        height: "95%",
                        backgroundColor: getThemeStyles().backgroundColor,
                        alignItems: "center",
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                      }}>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={styles.Heading}>Add Your Phone Number</Text>
            </View>
            <View>
              <Text style={{
                            fontSize: 14,
                            alignSelf: 'center',
                            color: getThemeStyles().color,
                            marginTop: 15,
                            width: 250,
                            fontWeight: "400",
                            flexShrink: 0,
                            textAlign: 'center',
                          }}> Please Add Your Phone Number to contiue</Text>
            </View>
            <View style={styles.Input_container}>
              <View style={{margin:20,flexDirection:'row'}}>
              <Input keyboardType="phone-pad" placeholder="Enter Your Phone Number"/>
              </View>
              <Button buttonStyle={{margin:10,borderRadius:15,backgroundColor:'#4964FF'}} title={'Continue'} loading={loading} onPress={handleVerify} />
                      
            </View>

            <View style={styles.backgroundImage}>
              <Image
                source={colorScheme === 'dark'?require('../../Assests/dark_banner_2.png'):require('../../Assests/banner_2.png')}
                style={{width:isKeyboardActive ? 250:350,height:isKeyboardActive ? 200:350}}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ color: "#fff" }}>Created by Rohan Goswami</Text>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </>
  );
}

export default Add_Phone;

const styles = StyleSheet.create({
  Main_container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#4964FF",
  },
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4964FF",
    marginBottom: 10,
  },
  Subheading: {
    fontSize: 12,
    alignSelf: 'center',
    color: "#808080",
    marginTop: 5,
    width: 250,
    fontWeight: "400",
    flexShrink: 0,
    textAlign: 'center',
  },
  Subheading_1: {
    fontSize: 14,
    alignSelf: 'center',
    color: "#808080",
    marginTop: 15,
    width: 250,
    fontWeight: "400",
    flexShrink: 0,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: "#4964FF",
    height: "100%",
    alignItems: 'center',
    marginTop: 10,
  },
  backgroundImage: {
    position: 'absolute',
    marginTop: 10,
    bottom: -25,
  },
  Input_container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  TextInputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingLeft: 10,
  },
  codeFieldRoot: {marginTop: 20},
  focusCell: {
    borderColor: '#0386D0',
  },
});
